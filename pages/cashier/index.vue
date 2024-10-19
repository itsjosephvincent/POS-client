<script setup lang="ts">
import { productService } from '~/api/cashier/ProductService';
import type { Cashier, Product } from '~/common/types';
import type admin from '~/middleware/admin';

definePageMeta({
    middleware: ['cashier'],
    layout: 'cashier',
});
const userStore = useUserStore();
const user: Cashier | null = userStore.getUser;
const pageStore = usePageStore();
const pageTitle = 'Cashier';
useHead({
    title: pageTitle,
});

const {
    rowsPerPage,
    totalPages,
    currentPage,
    sortField,
    sortOrder,
    filter,
    getRowsPerPage,
    getTotalPages,
    getCurrentPage,
    filterData,
    previousPageClick,
    nextPageClick,
    goToPage,
} = usePagination();
const isLoading: Ref<boolean> = ref(true);
const productsData: Ref<Array<Product> | null> = ref(null);

onMounted(() => {
    pageStore.setPage(pageTitle);
    fetch();
});

async function fetch(category_uuid: string | null = null) {
    try {
        isLoading.value = true;
        const params = {
            admin: user?.store.admin.uuid,
            page: currentPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            name: filter.value,
            category: category_uuid,
        };
        const response = await productService.all(params);
        isLoading.value = false;
        if (response.data) {
            productsData.value = response.data;
            rowsPerPage.value = response.meta.per_page;
            totalPages.value = response.meta.last_page;
            currentPage.value = response.meta.current_page;
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}
function categorySelect(uuid: string | null) {
    fetch(uuid);
}
</script>

<template>
    <div>
        <div
            class="flex flex-col justify-start items-start w-full h-[calc(100vh-110px)] py-4 lg:pl-4"
        >
            <CashierCategoryPicker @category-select="categorySelect" />
            <CashierProductsList
                :data-source="productsData"
                :loading="isLoading"
                :show-pagination="true"
                :current-page="getCurrentPage"
                :rows-per-page="getRowsPerPage"
                :total-pages="getTotalPages"
                @previous-page="previousPageClick(fetch)"
                @next-page="nextPageClick(fetch)"
                @go-to-page="(page: number) => goToPage(page, fetch)"
            />
        </div>
    </div>
</template>
