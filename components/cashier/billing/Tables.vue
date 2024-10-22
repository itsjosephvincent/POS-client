<script setup lang="ts">
const runningBillStore = useRunningBillStore();

const ordersLabel = computed(() =>
    runningBillStore.getTable ? `- ${runningBillStore.getTable.name} ` : '',
);
</script>

<template>
    <div class="w-full pt-2 px-2">
        <CashierTableSelect />
        <div class="font-bold text-primaryText mx-2 xl:mx-4">
            <span class="font-normal">Orders </span>
            <span> {{ ordersLabel }}</span>
        </div>
    </div>
</template>
