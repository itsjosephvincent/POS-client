<script setup lang="ts">
import { orderService } from '~/api/cashier/OrderService';
import { TransactionMode } from '~/common/types';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const cartStore = useCartStore();
const loadingStore = useLoadingStore();
const isPaymentMethod = ref(false);
const isLoading: Ref<boolean> = ref(false);

interface OrderRequestParams {
    table_uuid?: string;
    payment: number;
}

async function processTableOrder() {
    try {
        isLoading.value = true;
        let params: OrderRequestParams = {
            payment:
                transactionStore.getMode === TransactionMode.RunningBill
                    ? runningBillStore.getTotal
                    : cartStore.getTotal,
        };
        if (transactionStore.getMode === TransactionMode.RunningBill) {
            if (!runningBillStore.getTable) throw 'No table data.';
            params.table_uuid = runningBillStore.getTable?.uuid;
        }
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
            table: runningBillStore.getTable.uuid,
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
    <div class="w-full h-full flex flex-col justify-start items-start">
        <IconSvg
            @click="transactionStore.setPayment(false)"
            icon="left"
            size="1.5em"
            class="cursor-pointer z-10 pt-6 pl-4"
        />
        <h1>Payment</h1>
    </div>
</template>
