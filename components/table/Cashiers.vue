<script setup lang="ts">
import { CashierService } from '~/components/api/CashierService'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const data = ref([])
const role = userStore.getRole.toLowerCase()
const cashierService = new CashierService(role)
const admins = computed(() => data.value)
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)

const showDeleteModal = ref(false)
const itemToDelete = ref({})

interface DataTableColumns {
    key: string
    label: string
    sortable: boolean
}
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'name', label: 'Name', sortable: true, },
    { key: 'username', label: 'Username', sortable: true, },
    { key: 'is_active', label: 'Active', sortable: true, },
]
function columnHeaderClass(column: string) {
    return column === 'is_active' ? 'justify-center' : ''
}
function columnClass(row: object, columnKey: string) {
    return columnKey === 'is_active' ? 'text-center' : ''
}
const deleteHandler = (row: object) => {
    showDeleteModal.value = true
    itemToDelete.value = row
}
const editHandler = (row: object) => {
    navigateTo(`/${role}/cashiers/${row?.uuid}/edit`)
}
async function fetch(params: object = {}) {
    try {
        isLoading.value = true
        params['store_id'] = userStore.getUser.id
        const response = await cashierService.cashiers(params)
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
        handler: editHandler,
    },
    {
        key: 'delete',
        label: 'Delete',
        handler: deleteHandler,
    },
]
function handleRowClick(row: object) {
    navigateTo(`/${role}/cashiers/${row.uuid}`)
}
function createButtonHandler() {
    navigateTo(`/${role}/cashiers/new`)
}
function filterData(value: string) {
    const params = { name: value, }
    fetch(params)
}
async function handleDelete() {
    try {
        
        const uuid: string = itemToDelete.value.uuid
        closeDeleteModal()
        await cashierService.delete(uuid)
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
    <div class="w-full flex flex-col items-center justify-center py-4">
        <div class="w-full flex justify-start items-center gap-2 mb-4 ">
            <PrimaryButton label="New Cashier" icon="plus" @click="createButtonHandler" />
            <span class="grow"></span>
            <DataSearch class="self-end mr-4 lg:mr-0" placeholder="Find Cashier" @on-filter="filterData" />
        </div>
        <DataTable :columns="dataTableColumns" :data-source="admins" :actions="tableActions" :show-pagination="true"
        :column-class="columnClass"
        :column-header-class="columnHeaderClass"
        :loading="isLoading"
            :current-page="getCurrentPage" :rows-per-page="getRowsPerPage" :total-pages="getTotalPages"
            @previous-page="previousPageClick" @next-page="nextPageClick" @go-to-page="goToPage" @sort-data="sortData" @row-click="handleRowClick"
            search-placeholder="Filter admin accounts...">
            <template #column-is_active="{ row }">
                <span
                    :class="`${row.is_active ? 'bg-green-400/30 text-successColor' : 'bg-orange-400/30 text-warningColor'} px-2 py-1 rounded-lg text-sm font-medium text-center`">{{
                        row.is_active
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
                    <div class="text text-primaryText">Are you sure you want to delete cashier <span class="font-bold">{{ itemToDelete?.name }}</span>?</div>
                </div>
            </ModalDelete>
        </Teleport>
    </div>
</template>