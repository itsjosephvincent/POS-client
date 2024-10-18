<script setup lang="ts">
const pageTitle = 'Tables';
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
    pageStore.setParams(['New Table']);
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
</script>

<template>
    <div class="w-full px-6">
        <StoreTablesForm />
    </div>
</template>
