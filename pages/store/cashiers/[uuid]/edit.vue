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

function initializePageData(data: object) {
    pageStore.setParams([data.name, 'Edit']);
}
</script>

<template>
    <div class="w-full px-6">
        <StoreCashiersFormEdit @cashier-fetch="initializePageData" />
    </div>
</template>
