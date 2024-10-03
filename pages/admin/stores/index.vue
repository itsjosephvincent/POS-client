<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'
import { storeService } from '~/components/api/StoreService';

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
const userStore = useUserStore()
const pageStore = usePageStore()
const pageTitle = 'Stores'
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
    { key: 'store_name', label: 'Store' },
    { key: 'branch', label: 'Branch' },
    { key: 'username', label: 'Username' },
]
async function fetch(params: StoreServiceParams = {}) {
    try {
        params['admin_id'] = userStore.getUser.id
        const response = await storeService.stores(params)
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
onBeforeUnmount(() => {
    pageStore.setParams([])
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
function handleRowClick(row: object) {
    if (row && row.admin_id) {
        // // set Page State
        // pageStore.setPage('Stores')
        // pageStore.setParams(['Store', row.store_name, row.branch])
        navigateTo('/admin/stores/' + row.uuid)
    }

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
function onCreateNew() {
    navigateTo('/admin/stores/new')
}

</script>

<template>
    <div class="h-[calc(100vh-60px)] flex flex-col items-center  overflow-y-scroll">
        <div class="w-[90%] flex flex-col items-center justify-center py-4">
            <div class="w-full flex justify-between items-center mb-4">
                <PrimaryButton label="New Store" icon="plus" @click="onCreateNew" />
                <DataSearch class="self-end" placeholder="Find items..." />
            </div>
            <DataTable :columns="dataTableColumns" :data-source="admins" :has-create-button="true"
                create-button-label="New Store" :create-button-handler="onCreateNew" :actions="tableActions"
                :show-pagination="true" :current-page="getCurrentPage" :rows-per-page="getRowsPerPage"
                :total-pages="getTotalPages" @previous-page="previousPageClick" @next-page="nextPageClick"
                @go-to-page="goToPage" @sort-data="sortData" @row-click="handleRowClick"
                search-placeholder="Filter stores...">
                <template #column-enabled="{ row }">
                    <span
                        :class="`${row.enabled ? 'bg-secondaryColor' : 'bg-warningColor'} px-2 py-1 rounded-xl text-sm text-white font-bold`">{{
                            row.enabled
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
