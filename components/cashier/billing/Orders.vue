<script setup lang="ts">
import { TransactionMode } from '~/common/types';

const viewport = useViewport();

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const cartStore = useCartStore();
</script>

<template>
    <div class="w-full h-full flex flex-col justify-start items-start">
        <IconSvg
            v-if="viewport.isLessThan('desktop')"
            @click="$emit('drawerToggle')"
            icon="left"
            size="1.5em"
            class="cursor-pointer z-10 pt-6 pl-4"
        />
        <CashierBillingTabs />
        <CashierBillingTables
            v-if="transactionStore.getMode === TransactionMode.RunningBill"
        />
        <CashierBillingItems class="mt-2 grow" />
        <CashierBillingTotal />
    </div>
</template>
