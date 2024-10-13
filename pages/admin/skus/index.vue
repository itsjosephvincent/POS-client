<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'SKUs';
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
        <AdminProductsTable />
    </div>
</template>
