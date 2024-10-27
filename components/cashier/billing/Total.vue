<script setup lang="ts">
import { TransactionMode } from '~/common/types';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const cartStore = useCartStore();

function processOrderClick() {
    transactionStore.setPayment(true);
}

const total = computed(() =>
    transactionStore.getMode === TransactionMode.RunningBill
        ? runningBillStore.getTotal
        : cartStore.getTotal,
);
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
                @click="processOrderClick"
                label="Process Order"
                class="w-full bg-primaryColor"
                custom-class="bg-secondaryColor text-white m-2"
            />
        </div>
    </div>
</template>
