<script setup lang="ts">
import { adminService } from '../api/AdminService';
const data = ref([])
const admins = computed(() => data.value)
const rowsPerPage = ref(10)
const totalPages = ref(0)
const currentPage = ref(1)
interface DataTableColumns {
    key: string
    label: string
}
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'business_name', label: 'Business' },
    { key: 'username', label: 'Username' },
    { key: 'name', label: 'Name' },
    { key: 'enabled', label: 'Active' },
]
async function fetch(page: number|null = null) {
    try {
        debugger
        const response = await adminService.admins(page)
        if (response && response.data) {
            data.value = response.data.admins.data
            rowsPerPage.value = response.data.admins.per_page
            totalPages.value = response.data.admins.last_page
            currentPage.value = response.data.admins.current_page
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
    fetch(currentPage.value - 1)
}
function nextPageClick() {
    fetch(currentPage.value + 1)
}
function goToPage(page: number) {
    fetch(page)
}
</script>

<template>
    <div class="flex flex-col items-start justify-center w-full">
        <div class="p-4 flex flex-wrap items-center">
            <ReportCard title="1" sub-title="Active" description="Accounts" color="text-white"
                background="bg-secondaryColor" icon="staff" icon-color="#fff" />
            <ReportCard title="1" sub-title="Inactive" description="Accounts" color="text-white"
                background="bg-warningColor" icon="staff" icon-color="#fff" />
        </div>
        <DataTable :columns="dataTableColumns" :data-source="admins" :show-pagination="true" :current-page="getCurrentPage" :rows-per-page="getRowsPerPage" 
            :total-pages="getTotalPages" @previous-page="previousPageClick" @next-page="nextPageClick" @go-to-page="goToPage">
            <template #column-enabled="{ row }">
                <span :class="`${row.enabled ? 'bg-secondaryColor' : 'bg-warningColor'} px-2 py-1 rounded-xl text-sm text-white font-bold`">{{row.enabled ? 'Active' : 'Inactive'  }}</span>
            </template>
        </DataTable>
    </div>
</template>