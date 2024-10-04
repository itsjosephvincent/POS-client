<script setup lang="ts">
import { classificationService } from '~/components/api/ClassificationService'
import { productService } from '~/components/api/ProductService'

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
const route = useRoute()
const pageStore = usePageStore()
const pageTitle = 'Classifications'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    classificationFetch()
    fetch({ category_uuid: route.params.uuid })
})
onBeforeUnmount(() => {
    // pageStore.setParams([])
})
async function classificationFetch() {
    try {
        const response = await classificationService.find(route.params.uuid)
        if (response.data) {
            classificationData.value = response.data
            pageStore.setParams([response.data.name])
            pageStore.setData(response.data)
        }

    } catch (error) {
        console.error(error)
    }
}

const isLoading = ref(false)
const classificationData = ref(null)
const productsData = ref([])
const getClassificationName = computed(() => classificationData.value && classificationData.value.name ? classificationData.value.name : 'Product')
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)

const getRowsPerPage = computed(() => rowsPerPage.value || 10)
const getTotalPages = computed(() => totalPages.value)
const getCurrentPage = computed(() => currentPage.value)

interface ProductServiceParams {
    category_uuid?: string | string[]
    page?: number
    sortField?: string
    sortOrder?: string
}
async function fetch(params: ProductServiceParams = {}) {
    try {
        isLoading.value = true
        params.category_uuid = route.params.uuid
        const response = await productService.all(params)
        isLoading.value = false
        if (response.data) {
            productsData.value = response.data
            rowsPerPage.value = response.meta.per_page
            totalPages.value = response.meta.last_page
            currentPage.value = response.meta.current_page
        }
    } catch (error) {
        isLoading.value = false
        console.error(error)
    }
}

const dataTableColumns: Array<object> = [
    { key: 'name', label: 'Name' },
    { key: 'cost', label: 'Cost of Goods' },
    { key: 'price', label: 'SRP' },
    { key: 'inventory', label: 'Inventory Count' },
]
const tableActions = [
    {
        key: 'edit',
        label: 'Edit',
        handler: (row: object) => {
            console.log('Edit action triggered for:', row);
            // Add your custom edit logic here
        },
    },
    {
        key: 'delete',
        label: 'Delete',
        handler: (row: object) => {
            console.log('Delete action triggered for:', row);
            // Add your custom delete logic here
        },
    },
]
function previousPageClick() {
    fetch({ page: currentPage.value - 1 })
}
function nextPageClick() {
    fetch({ page: currentPage.value + 1 })
}
function goToPage(page: number) {
    fetch({ page })
}
function sortData(column: string, direction: string) {
    currentPage.value = 1
    fetch({
        page: currentPage.value,
        sortField: column,
        sortOrder: direction,
    })

}
function columnHeaderClass(column) {
    return column === 'cost' || column === 'price' || column === 'inventory'
        ? 'justify-end' : ''
}
function columnClass(row, columnKey) {
    return columnKey === 'cost' || columnKey === 'price' || columnKey === 'inventory'
        ? 'text-right' : ''
}
function handleRowClick(row: object) {
    // navigateTo('/admin/skus/' + row.uuid)
}
function createButtonHandler() {
    navigateTo(`/admin/classifications/${route.params.uuid}/new`)
}
function importButtonHandler() {
    navigateTo(`/admin/classifications/${route.params.uuid}/import`)
}
</script>

<template>
    <div class="h-[calc(100vh-60px)] flex flex-col items-center  overflow-y-scroll">
        <div class="w-[90%] flex flex-col items-center justify-center py-4">
            <div class="w-full flex justify-start items-center gap-2 mb-4">
                <PrimaryButton :label="`New ${getClassificationName}`" icon="plus" @click="createButtonHandler" />
                <span class="grow"></span>
                <DataSearch class="self-end" placeholder="Find items..." />
            </div>
            <DataTable :loading="isLoading" :columns="dataTableColumns" :data-source="productsData" :column-class="columnClass"
                :actions="tableActions" :has-create-button="true" create-button-label="New SKU"
                :column-header-class="columnHeaderClass" @row-click="handleRowClick"
                :create-button-handler="createButtonHandler" :show-pagination="true" :current-page="getCurrentPage"
                :rows-per-page="getRowsPerPage" :total-pages="getTotalPages" @previous-page="previousPageClick"
                @next-page="nextPageClick" @go-to-page="goToPage" @sort-data="sortData">
                <template #action-edit="{ action }">
                    <button class="p-2 rounded-full hover:bg-sky-500/30">
                        <IconSvg icon="edit" color="var(--secondary-color)" size="1.5em" />
                    </button>
                </template>
                <template #action-delete="{ action }">
                    <button class="p-2 rounded-full hover:bg-red-500/30">
                        <IconSvg icon="delete" color="var(--error-color)" size="1.5em" />
                    </button>
                </template>
            </DataTable>
        </div>
    </div>
</template>