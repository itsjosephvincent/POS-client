<script setup lang="ts">
import type { Order } from '~/common/types';

const pageTitle = 'Orders';
const pageStore = usePageStore();

definePageMeta({
    layout: 'store',
    middleware: ['store'],
});
useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
});
function initializePageData(order: Order) {
    pageStore.setParams([order.order_number]);
}
</script>

<template>
    <div class="w-full px-6">
        <StoreOrdersDisplay @order-fetch="initializePageData" />
    </div>
</template>
