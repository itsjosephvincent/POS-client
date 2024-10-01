<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'
import { cashierService } from '~/components/api/CashierService';

definePageMeta({
    layout: 'store',
    middleware: ['store'],
})
const userStore = useUserStore()
const pageStore = usePageStore()
const pageTitle = 'Cashiers'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})

const data = ref([])
const admins = computed(() => data.value)
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)
interface DataTableColumns {
    key: string
    label: string
}
interface StoreServiceParams {
    admin_id?: number
    page?: number
    sortField?: string
    sortOrder?: string
}
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
]
async function fetch(params: StoreServiceParams = {}) {
    try {
        params['store_id'] = userStore.getUser.id
        const response = await cashierService.cashiers(params)
        if (response && response.data) {
            data.value = response.data
            rowsPerPage.value = response.meta.per_page
            totalPages.value = response.meta.last_page
            currentPage.value = response.meta.current_page
            console.log(data.value)
        } else {
            throw 'Empty data.'
        }

    } catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    fetch()
})
const getRowsPerPage = computed(() => rowsPerPage.value || 10)
const getTotalPages = computed(() => totalPages.value)
const getCurrentPage = computed(() => currentPage.value)
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
</script>

<template>
    <div class="h-[calc(100vh-60px)] overflow-y-scroll">
        <div class="flex flex-col items-center justify-center py-4">
            <DataTable :columns="dataTableColumns" :data-source="admins" :actions="tableActions" :show-pagination="true"
                :current-page="getCurrentPage" :rows-per-page="getRowsPerPage" :total-pages="getTotalPages"
                @previous-page="previousPageClick" @next-page="nextPageClick" @go-to-page="goToPage"
                @sort-data="sortData" search-placeholder="Filter admin accounts...">
                <template #column-enabled="{ row }">
                    <span
                        :class="`${row.enabled ? 'bg-secondaryColor' : 'bg-warningColor'} px-2 py-1 rounded-xl text-sm text-white font-bold`">{{ row.enabled
                            ? 'Active' : 'Inactive' }}</span>
                </template>
                <template #action-edit="{ action }">
                    <button class="p-1 rounded-full hover:bg-sky-500/30">
                        <IconSvg icon="edit" color="var(--secondary-color)" size="1.5em" />
                    </button>
                </template>
                <template #action-delete="{ action }">
                    <button class="p-1 rounded-full hover:bg-red-500/30">
                        <IconSvg icon="delete" color="var(--error-color)" size="1.5em" />
                    </button>
                </template>
            </DataTable>
        </div>
    </div>
</template>
