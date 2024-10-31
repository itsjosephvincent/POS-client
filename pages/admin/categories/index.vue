<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { categoryService } from '~/api/admin/CategoryService';

const pageTitle = 'Categories';
const categoryStore = useCategoryStore();
const pageStore = usePageStore();
const categoriesData = ref([]);
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
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
onMounted(() => {
    fetch();
});

const isFetching = ref(false);
async function fetch() {
    try {
        isFetching.value = true;
        const response = await categoryService.fetch();
        isFetching.value = false;
        if (response.data) {
            categoriesData.value = response.data;
            categoryStore.setCategories(response.data);
        }
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
function onAddNew() {
    navigateTo('/admin/categories/new');
}
function cardClickHandler(row: object) {}
</script>

<template>
    <div class="w-full px-6">
        <LoadingCategoryListSkeleton v-if="isFetching" />
        <div v-else class="w-full flex flex-col items-start">
            <PrimaryButton
                class="mb-6"
                label="New Category"
                icon="plus"
                @click="onAddNew"
            />
            <div class="w-full flex items-center justify-start flex-wrap gap-4">
                <AdminCategoriesItemCard
                    v-for="item in categoriesData"
                    :category-data="item"
                    @fetch-categories="fetch"
                />
            </div>
        </div>
    </div>
</template>
