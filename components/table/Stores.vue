<script setup lang="ts">
import { storeService } from '~/components/api/StoreService';

const userStore = useUserStore()

const data = ref([])
const admins = computed(() => data.value)
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)

onMounted(() => {
    fetch()
})

interface DataTableColumns {
    key: string
    label: string
    sortable?: boolean
}
interface StoreServiceParams {
    admin_id?: number
    page?: number
    sortField?: string
    sortOrder?: string
}
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'store_name', label: 'Store', sortable: true },
    { key: 'branch', label: 'Branch', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
]
async function fetch(params: StoreServiceParams = {}) {
    try {
        isLoading.value = true
        params['admin_id'] = userStore.getUser.id
        const response = await storeService.stores(params)
        isLoading.value = false
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
        isLoading.value = false
        console.error(error)
    }
}
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
    // if (row && row.admin_id) {
    //     navigateTo('/admin/stores/' + row.uuid)
    // }
}
const tableActions = [
    {
        key: 'edit',
        label: 'Edit',
        handler: (row: object) => {
            navigateTo(`/admin/stores/${row.uuid}/edit`)
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
    <div class="w-[90%] flex flex-col items-center justify-center py-4">
        <div class="w-full flex justify-between items-center mb-4">
            <PrimaryButton label="New Store" icon="plus" @click="onCreateNew" />
            <DataSearch class="self-end" placeholder="Find items..." />
        </div>
        <DataTable :loading="isLoading" :columns="dataTableColumns" :data-source="admins" :has-create-button="true"
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
                    <IconSvg icon="edit" color="secondaryColor" />
                </button>
            </template>
            <template #action-delete="{ action }">
                <button class="p-1 rounded-full hover:bg-red-500/30">
                    <IconSvg icon="delete" color="errorColor" />
                </button>
            </template>
        </DataTable>
    </div>
</template>