<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});

const pageStore = usePageStore();
const pageTitle = 'Categories';
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
        <AdminCategoriesFormEdit @category-fetch="initializePageData" />
    </div>
</template>
