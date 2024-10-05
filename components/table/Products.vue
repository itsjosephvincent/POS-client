<script setup lang="ts">
import { productService } from '~/components/api/ProductService'

const props = defineProps<{
    categoryUuid?: string
}>()

const isLoading = ref(false)
const classificationData = ref(null)
const productsData = ref([])
const getClassificationName = computed(() => classificationData.value && classificationData.value.name ?                classificationData.value.name : 'Product')
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)

const getRowsPerPage = computed(() => rowsPerPage.value || 10)
const getTotalPages = computed(() => totalPages.value)
const getCurrentPage = computed(() => currentPage.value)

onMounted(() => {
    fetch()
})

interface DataTableColumns {
    key: string
    label: string
    sortable: boolean
}
interface ProductServiceParams {
    category_uuid?: string | string[]
    page?: number
    sortField?: string
    sortOrder?: string
}

const dataTableColumns: Array<DataTableColumns> = [
    { key: 'image', label: '', sortable: false },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'category_name', label: 'Category', sortable: false },
    { key: 'cost', label: 'Cost of Goods', sortable: true },
    { key: 'price', label: 'SRP', sortable: true },
    { key: 'inventory', label: 'Inventory Count', sortable: true },
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
async function fetch(params: ProductServiceParams = {}) {
    try {
        isLoading.value = true
        if (props.categoryUuid) {
            params.category_uuid = props.categoryUuid
        }
        const response = await productService.all(params)
        isLoading.value = false
        if (response.data) {
            productsData.value = response.data.map((d: object) => {
                if (d.category) {
                    d.category_uuid = d.category.uuid
                    d.category_name = d.category.name
                }
                delete d.category
                return d
            })
            rowsPerPage.value = response.meta.per_page
            totalPages.value = response.meta.last_page
            currentPage.value = response.meta.current_page
        }
    } catch (error) {
        isLoading.value = false
        console.error(error)
    }
}
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
    if (column === 'category_name') return
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
    if (columnKey === 'image') return 'max-w-[90px] pl-4'
    return columnKey === 'cost' || columnKey === 'price' || columnKey === 'inventory'
        ? 'text-right' : ''
}
function handleRowClick(row: object) {
    navigateTo(`/admin/skus/${row.uuid}`)
}
function createButtonHandler() {
    navigateTo(`/admin/skus/new`)
}
function importButtonHandler() {
    navigateTo(`/admin/skus/import`)
}

</script>

<template>
    <div class="w-full flex flex-col items-center justify-center py-4">
            <div class="w-full flex justify-start items-center gap-2 mb-4">
                <PrimaryButton label="New SKU" icon="plus" @click="createButtonHandler" />
                <PrimaryButton class="" icon="import" label="Import SKUs" @click="importButtonHandler" />
                <span class="grow"></span>
                <DataSearch class="self-end" placeholder="Find items..." />
            </div>
            <DataTable :loading="isLoading" :columns="dataTableColumns" :data-source="productsData" :column-class="columnClass"
                :actions="tableActions" :has-create-button="true" create-button-label="New SKU"
                :column-header-class="columnHeaderClass" @row-click="handleRowClick"
                :create-button-handler="createButtonHandler" :show-pagination="true" :current-page="getCurrentPage"
                :rows-per-page="getRowsPerPage" :total-pages="getTotalPages" @previous-page="previousPageClick"
                @next-page="nextPageClick" @go-to-page="goToPage" @sort-data="sortData">
                <template #column-image="{ row, column }">
                    <div class="w-full rounded-full flex items-center justify-center py-2">
                        <img v-if="row[column.key]" :src="row[column.key]" :alt="row.name" class="object-fill rounded-full h-[40px] w-[40px]">
                        
                    </div>
                </template>
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
</template>