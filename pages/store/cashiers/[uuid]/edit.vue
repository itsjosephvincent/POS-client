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
    <div
        class="h-[calc(100vh-60px)] w-full lg:max-w-[600px] overflow-y-scroll bg-secondaryBg lg:bg-primaryBg lg:p-4 lg:ml-6"
    >
        <StoreCashiersFormEdit @cashier-fetch="initializePageData" />
    </div>
</template>
