<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
const route = useRoute();
const pageStore = usePageStore();
const classificationStore = useClassificationStore();
const pageTitle = 'Classifications';
useHead({
    title: pageTitle,
});
onMounted(() => {
    initializePageData();
});
function initializePageData() {
    pageStore.setPage(pageTitle);
    let classifications = classificationStore.getClassifications;
    let current = classifications.find(
        (classification) => classification.uuid === route.params.uuid,
    );
    if (!current) {
        return navigateTo('/admin/classifications');
    }
    classificationStore.setCurrent(current);
    pageStore.setParams([current.name]);
}
const getCurrentCategoryUuid = computed(
    () => classificationStore.getCurrent?.uuid || '',
);
</script>

<template>
    <div class="w-full px-6">
        <AdminProductsTable :category-uuid="getCurrentCategoryUuid" />
    </div>
</template>
