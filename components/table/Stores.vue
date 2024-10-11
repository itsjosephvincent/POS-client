<script setup lang="ts">
import { storeService } from '~/components/api/StoreService';
import { adminService } from '../api/AdminService';

const userStore = useUserStore()

const data = ref([])
const admins = computed(() => data.value)
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)

const showDeleteModal = ref(false)
const itemToDelete = ref({})

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
    { key: 'is_active', label: 'Active', sortable: true, },
]
function columnHeaderClass(column: string) {
    return column === 'is_active' ? 'justify-center' : ''
}
function columnClass(row: object, columnKey: string) {
    return columnKey === 'is_active' ? 'text-center' : ''
}
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
            showDeleteModal.value = true
            itemToDelete.value = row
        },
    },
]
function onCreateNew() {
    navigateTo('/admin/stores/new')
}
async function handleDelete() {
    try {
        
        const uuid: string = itemToDelete.value.uuid
        closeDeleteModal()
        await storeService.delete(uuid)
        fetch()
    } catch(error) {
        console.error(error)
    }
}
function closeDeleteModal() {
    showDeleteModal.value = false
    itemToDelete.value = {}
}

</script>

<template>
    <div class="w-full flex flex-col items-center justify-center py-4 px-2 lg:mx-0">
        <div class="w-full flex justify-between items-center mb-4">
            <PrimaryButton label="New Store" icon="plus" @click="onCreateNew" />
            <DataSearch class="self-end" placeholder="Find Store" />
        </div>
        <DataTable :loading="isLoading" :columns="dataTableColumns" :data-source="admins" :has-create-button="true"
        :column-class="columnClass"
        :column-header-class="columnHeaderClass"
            create-button-label="New Store" :create-button-handler="onCreateNew" :actions="tableActions"
            :show-pagination="true" :current-page="getCurrentPage" :rows-per-page="getRowsPerPage"
            :total-pages="getTotalPages" @previous-page="previousPageClick" @next-page="nextPageClick"
            @go-to-page="goToPage" @sort-data="sortData" @row-click="handleRowClick"
            search-placeholder="Filter Stores">
            <template #column-is_active="{ row }">
                <span
                    :class="`${row.is_active ? 'bg-green-400/30 text-successColor' : 'bg-orange-400/30 text-warningColor'} px-2 py-1 rounded-lg text-sm font-medium text-center`">{{
                        row.is_active
                            ? 'Active' : 'Inactive' }}</span>
            </template>
            <template #column-enabled="{ row }">
                <span
                    :class="`${row.enabled ? 'bg-secondaryColor' : 'bg-warningColor'} px-2 py-1 rounded-xl text-sm text-white font-bold`">{{
                        row.enabled
                            ? 'Active' : 'Inactive' }}</span>
            </template>
            <template #action-edit="{ action }">
                <button class="p-1 rounded-full hover:bg-sky-500/30">
                    <IconSvg icon="edit" color="secondaryColor" size="1.2em" />
                </button>
            </template>
            <template #action-delete="{ action }">
                <button class="p-1 rounded-full hover:bg-red-500/30">
                    <IconSvg icon="delete" color="errorColor" size="1.2em" />
                </button>
            </template>
        </DataTable>
        <Teleport to="body">
            <ModalDelete :visible="showDeleteModal" @close-delete-modal="closeDeleteModal" @delete-confirmed="handleDelete" >
                <div class="flex items-center gap-4 my-4">
                    <IconSvg icon="error" color="errorColor" size="2em" />
                    <div class="text text-primaryText">Are you sure you want to delete store <span class="font-bold">{{ itemToDelete?.store_name }} - {{ itemToDelete?.branch }}</span>?</div>
                </div>
            </ModalDelete>
        </Teleport>
    </div>
</template>