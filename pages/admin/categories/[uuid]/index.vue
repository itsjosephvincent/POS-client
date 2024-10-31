<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
const route = useRoute();
const pageStore = usePageStore();
const categoryStore = useCategoryStore();
const pageTitle = 'Categories';
useHead({
    title: pageTitle,
});
onMounted(() => {
    initializePageData();
});
function initializePageData() {
    pageStore.setPage(pageTitle);
    let categories = categoryStore.getCategories;
    let current = categories.find(
        (category) => category.uuid === route.params.uuid,
    );
    if (!current) {
        return navigateTo('/admin/categories');
    }
    categoryStore.setCurrent(current);
    pageStore.setParams([current.name]);
}
const getCurrentCategoryUuid = computed(
    () => categoryStore.getCurrent?.uuid || '',
);
</script>

<template>
    <div class="w-full px-6">
        <AdminProductsTable :category-uuid="getCurrentCategoryUuid" />
    </div>
</template>
