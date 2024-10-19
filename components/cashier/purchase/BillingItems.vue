<script setup lang="ts">
import type { BillingProduct } from '~/common/types';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();

const billedItems = computed(() => runningBillStore.getProducts);
</script>

<template>
    <div class="w-full h-[calc(100vh-400px)] overflow-y-auto">
        <div
            v-if="billedItems && billedItems.length"
            v-for="item in billedItems"
            class="px-4 py-2 flex justify-between items-center text-primaryText gap-2"
        >
            <div class="flex justify-start items-center gap-2">
                <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-11 h-11 rounded-xl object-cover"
                />
                <div class="font-bold">{{ item.name }}</div>
            </div>
            <div class="">
                <div class="font-medium text-secondaryText text-xs text-right">
                    {{ item.quantity }} x {{ item.price }}
                </div>
                <div class="font-bold text-right">
                    {{ (item.price * item.quantity).toFixed(2) }}
                </div>
            </div>
        </div>
    </div>
</template>
