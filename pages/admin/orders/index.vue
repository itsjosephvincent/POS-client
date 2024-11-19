<script setup lang="ts">
const pageTitle = 'Orders';
const pageStore = usePageStore();
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
    pageStore.setParams([]);
});
</script>

<template>
    <div id="products-page" class="w-full px-6">
        <AdminOrdersTable />
    </div>
</template>
