<script setup lang="ts">
import { tableService } from '~/api/cashier/TableService';
import { runningBillService } from '~/api/cashier/RunningBillService';
import {
    TransactionMode,
    type BillingProduct,
    type Cashier,
    type RunningBill,
    type Table,
} from '~/common/types';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const user: Cashier | null = userStore.getUser;
const isFetching: Ref<boolean> = ref(false);

const tables: Ref<Array<Table> | null> = ref(null);
const selectModel = defineModel();
const runningBills: Ref<Array<BillingProduct> | null> = ref(null);

onMounted(() => {
    fetch();
    if (transactionStore.getMode === TransactionMode.RunningBill) {
        selectModel.value = runningBillStore.getTable;
    }
});
watch(
    () => selectModel.value,
    (table_uuid: any) => {
        if (!table_uuid) return;
        fetchRunningBill(table_uuid);
        if (!tables.value) return;
        const table = tables.value.find((item) => item.uuid === table_uuid);
        if (!table) return;
        transactionStore.setMode(TransactionMode.RunningBill); // Set TransactionStore
        runningBillStore.setTable(table);
    },
);
async function fetch() {
    try {
        isFetching.value = true;
        const params = {
            store_id: user?.store.id,
        };
        const response = await tableService.fetch(params);
        isFetching.value = false;
        if (!response.data) throw 'Unable to fetch tables.';
        tables.value = response.data;
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
async function fetchRunningBill(table_uuid: any) {
    try {
        loadingStore.setLoading(true);
        console.log('fetch running bills table: ', table_uuid);
        const params = {
            table: table_uuid,
        };
        const response = await useRunningBillFetch().fetch(params);
        loadingStore.setLoading(false);
        if (!response)
            throw 'No data fetched for running bills table: ' + table_uuid;
        runningBills.value = response;
        const runningBillProducts: Array<BillingProduct> = response.map(
            (item: any) => {
                return {
                    id: item.product.id,
                    uuid: item.product.uuid,
                    name: item.product.name,
                    cost: item.product.cost,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image,
                };
            },
        );
        runningBillStore.setProducts(runningBillProducts);
    } catch (error) {
        loadingStore.setLoading(false);
        console.error(error);
    }
}

const tableOptions = computed(() => {
    if (tables.value) {
        return tables.value.map((i: Table) => {
            return { key: i.uuid, value: i.uuid, label: i.name };
        });
    }
    return null;
});
</script>

<template>
    <div class="p-2">
        <div v-if="isFetching" class="">
            <div
                class="animate-pulse w-full h-[35px] my-4 bg-slate-200 rounded-xl"
            ></div>
        </div>
        <FormSelect
            v-if="tables && !isFetching"
            :options="tableOptions"
            label="Table"
            placeholder="Select Table"
            name="table"
            class="p-0"
            v-model="selectModel"
            :pre-selected-data="null"
        />
    </div>
</template>
