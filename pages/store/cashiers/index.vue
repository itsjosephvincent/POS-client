<script setup lang="ts">
definePageMeta({
    layout: 'store',
    middleware: ['store'],
});

const pageStore = usePageStore();
const pageTitle = 'Cashiers';
useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
</script>

<template>
    <div class="w-full px-6">
        <StoreCashiersTable />
    </div>
</template>
