<script setup lang="ts">
import { productService } from '~/api/cashier/ProductService';
import type {
    BillingProduct,
    Cashier,
    Product,
    SuperAdmin,
    Admin,
    Store,
} from '~/common/types';
import useProductFilter from '~/components/cashier/composables/useProductFilter';

definePageMeta({
    middleware: ['cashier'],
    layout: 'cashier',
});
const userStore = useUserStore();
const user: SuperAdmin | Admin | Store | Cashier | null = userStore.getUser;
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
const productsData: Ref<Array<BillingProduct> | null> = ref(null);
const { productFilter } = useProductFilter();

onMounted(() => {
    pageStore.setPage(pageTitle);
    fetch();
});

watch(
    () => productFilter.value,
    () => {
        fetch();
    },
);

async function fetch(category_uuid: string | null = null) {
    try {
        isLoading.value = true;
        console.log('ProductFilter', productFilter.value);
        const params = {
            admin: user?.store.admin.uuid,
            page: currentPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            name: productFilter.value,
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
            class="flex flex-col justify-start items-start lg:w-[calc(100vw-400px)] h-[calc(100vh-72px)] pt-4"
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
