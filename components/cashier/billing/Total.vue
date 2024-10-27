<script setup lang="ts">
import { TransactionMode } from '~/common/types';
import { orderService } from '~/api/cashier/OrderService';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';
import { cartService } from '~/api/cashier/CartService';

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
function processOrderClick() {
    transactionStore.setPayment(true);
}

const total = computed(() =>
    transactionStore.getMode === TransactionMode.RunningBill
        ? runningBillStore.getTotal
        : cartStore.getTotal,
);
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
        let response;
        if (transactionStore.getMode === TransactionMode.RunningBill) {
            response = await useRunningBillFetch().fetch(params);
        } else {
            response = await cartService.fetch({});
        }
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
    <div class="w-full">
        <div class="m-2 flex justify-between font-bold text-primaryText">
            <div class="">Subtotal</div>
            <div class="">P{{ total.toFixed(2) }}</div>
        </div>
        <div
            class="m-2 flex justify-between font-bold text-sm text-tertiaryText"
        >
            <div class="">Tax (10%)</div>
            <div class="">P{{ (total * 0.1).toFixed(2) }}</div>
        </div>
        <div
            class="m-2 border-b-2 border-dashed border-tertiaryText mt-4"
        ></div>
        <div class="mx-2 m-4 flex justify-between font-bold text-primaryText">
            <div class="">Total</div>
            <div class="">P{{ (total + total * 0.1).toFixed(2) }}</div>
        </div>
        <div class="flex justify-center items-center">
            <PrimaryButton
                label="Process Order"
                :loading="isLoading"
                class="bg-primaryColor"
                @click="processTableOrder"
                custom-class="bg-secondaryColor text-white w-full m-2"
            />
        </div>
    </div>
</template>
