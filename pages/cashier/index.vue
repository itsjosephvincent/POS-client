<script setup lang="ts">
import { productService } from '~/api/admin/ProductService'; //@TODO Cashier endpoints

definePageMeta({
    middleware: ['cashier'],
    layout: 'cashier',
});
const pageStore = usePageStore();
const pageTitle = 'Cashier';
useHead({
    title: pageTitle,
});

const productsData = ref([]);
const isLoading = ref(false);

const rowsPerPage = ref(10);
const totalPages = ref(0);
const currentPage = ref(1);
const sortField = ref('');
const sortOrder = ref('ascend');
const filter = ref('');

const getRowsPerPage = computed(() => rowsPerPage.value || 10);
const getTotalPages = computed(() => totalPages.value);
const getCurrentPage = computed(() => currentPage.value);

onMounted(() => {
    pageStore.setPage(pageTitle);
    fetch();
});

async function fetch() {
    try {
        isLoading.value = true;
        const params = {
            page: currentPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            name: filter.value,
        };
        const response = await productService.all(params);
        isLoading.value = false;
        if (response.data) {
            productsData.value = response.data.map((d: object) => {
                if (d.category) {
                    d.category_uuid = d.category.uuid;
                    d.category_name = d.category.name;
                }
                delete d.category;
                return d;
            });
            rowsPerPage.value = response.meta.per_page;
            totalPages.value = response.meta.last_page;
            currentPage.value = response.meta.current_page;
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}

function filterData(value: string) {
    filter.value = value;
    fetch();
}
function previousPageClick() {
    currentPage.value -= 1;
    fetch();
}
function nextPageClick() {
    currentPage.value += 1;
    fetch();
}
function goToPage(page: number) {
    currentPage.value = page;
    fetch();
}
</script>

<template>
    <div>
        <div
            class="flex justify-start items-start w-full h-[calc(100vh-110px)] overflow-y-auto overflow-x-hidden p-4"
        >
            <CashierProductsList
                :data-source="productsData"
                :loading="isLoading"
                :show-pagination="true"
                :current-page="getCurrentPage"
                :rows-per-page="getRowsPerPage"
                :total-pages="getTotalPages"
                @previous-page="previousPageClick"
                @next-page="nextPageClick"
                @go-to-page="goToPage"
            />
        </div>
    </div>
</template>
