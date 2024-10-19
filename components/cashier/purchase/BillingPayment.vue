<script setup lang="ts">
import { orderService } from '~/api/cashier/OrderService';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const loadingStore = useLoadingStore();
const isPaymentMethod = ref(false);
const isLoading: Ref<boolean> = ref(false);

async function processTableOrder() {
    try {
        isLoading.value = true;
        if (!runningBillStore.getTable) throw 'No table data.';
        const params = {
            table_uuid: runningBillStore.getTable?.uuid,
        };
        const response = await orderService.create(params);
        isLoading.value = false;
        if (!response.data) throw 'Error in creating order';
        alert(
            `Successfully processed Order number: ${response.data.order_number}`,
        );
        updateBills();
    } catch (error) {
        console.error(error);
        isLoading.value = false;
    }
}
async function updateBills() {
    try {
        loadingStore.setLoading(true);
        if (!runningBillStore.getTable) throw 'No table data.';
        const params = {
            table_id: runningBillStore.getTable.id,
        };
        const response = await useRunningBillFetch().fetch(params);
        loadingStore.setLoading(false);
        if (!response) throw 'No data fetched for running bills table';
        runningBillStore.setProducts(response);
    } catch (error) {
        loadingStore.setLoading(false);
        console.error(error);
    }
}
</script>

<template>
    <div class="mx-2 xl:mx-2 mb-4 flex flex-col gap-4">
        <div v-if="isPaymentMethod" class="font-bold text-lg text-primaryText">
            Payment Method
        </div>
        <div v-if="isPaymentMethod" class="flex gap-6 justify-start">
            <div
                class="p-4 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-400"
            >
                <IconSvg icon="cash" />
            </div>
            <div
                class="p-4 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-400"
            >
                <IconSvg icon="creditCard" />
            </div>
        </div>
        <PrimaryButton
            label="Process Order"
            :loading="isLoading"
            class="bg-primaryColor"
            @click="processTableOrder"
            custom-class="bg-secondaryColor text-white w-full"
        />
    </div>
</template>
