<script setup lang="ts">
import { orderService } from '~/api/cashier/OrderService';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const isPaymentMethod = ref(false);

async function processTableOrder() {
    try {
        if (!runningBillStore.getTable) throw 'No table data.';
        const params = {
            table_uuid: runningBillStore.getTable?.uuid,
        };
        const response = await orderService.create(params);
        if (!response.data) throw 'Error in creating order';
        updateBills();
    } catch (error) {
        console.error(error);
    }
}
async function updateBills() {
    try {
        if (!runningBillStore.getTable) throw 'No table data.';
        const params = {
            table_id: runningBillStore.getTable.id,
        };
        const response = await useRunningBillFetch().fetch(params);
        if (!response) throw 'No data fetched for running bills table';
        runningBillStore.setProducts(response);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="mx-2 xl:mx-6 mb-4 flex flex-col gap-4">
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
        <button
            @click="processTableOrder"
            type="button"
            class="p-2 rounded-lg bg-primaryColor text-white font-bold text-lg"
        >
            Process Transaction
        </button>
    </div>
</template>
