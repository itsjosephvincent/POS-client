<script setup lang="ts">
import type { Product } from '~/common/types';
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
});
function initializePageData(product: Product) {
    pageStore.setParams([product.name]);
}
</script>

<template>
    <div class="w-full px-6">
        <AdminProductsDisplay @product-fetch="initializePageData" />
    </div>
</template>
