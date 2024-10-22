<script setup lang="ts">
import { TransactionMode } from '~/common/types';

const transactionStore = useTransactionStore();

const baseClass = computed(() => 'font-bold text-primaryText');
const activeClass = computed(
    () => 'p-2 font-bold text-secondaryColor border-b-2 border-secondaryColor',
);
</script>

<template>
    <div class="w-full m-4 flex justify-start items-center gap-4">
        <div
            :class="[
                transactionStore.getMode === TransactionMode.RunningBill
                    ? activeClass
                    : baseClass,
            ]"
        >
            Dine In
        </div>
        <div
            :class="[
                transactionStore.getMode === TransactionMode.Cart
                    ? activeClass
                    : baseClass,
            ]"
        >
            Take Out
        </div>
    </div>
</template>
