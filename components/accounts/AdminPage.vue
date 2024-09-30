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
    { key: 'lastname', label: 'Lastname' },
    { key: 'firstname', label: 'Firstname' },
    { key: 'username', label: 'Username' },
]
async function fetch(page: number|null = null) {
    try {
        const response = await adminService.admins(page)
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
    fetch(currentPage.value - 1)
}
function nextPageClick() {
    fetch(currentPage.value + 1)
}
function goToPage(page: number) {
    fetch(page)
}
function sortData(column: string, direction: string) {
    console.log('sort', column, direction)
}
const tableActions = [
  {
    label: 'Edit',
    handler: (row) => {
      console.log('Edit action triggered for:', row);
      // Add your custom edit logic here
    },
  },
  {
    label: 'Delete',
    handler: (row) => {
      console.log('Delete action triggered for:', row);
      // Add your custom delete logic here
    },
  },
];
</script>

<template>
    <div class="flex flex-col items-center justify-center py-4">
        <div class="w-full lg:w-[90%] py-4 flex flex-wrap justify-start items-center gap-4">
            <!-- <ReportCard title="1" sub-title="Active" description="Accounts" color="text-white"
                background="bg-secondaryColor" icon="staff" icon-color="#fff" />
            <ReportCard title="1" sub-title="Inactive" description="Accounts" color="text-white"
                background="bg-warningColor" icon="staff" icon-color="#fff" /> -->
        </div>
        <DataTable :columns="dataTableColumns" :data-source="admins" :actions="tableActions" :show-pagination="true" :current-page="getCurrentPage" :rows-per-page="getRowsPerPage" 
            :total-pages="getTotalPages" @previous-page="previousPageClick" @next-page="nextPageClick" @go-to-page="goToPage" @sort-data="sortData">
            <template #column-enabled="{ row }">
                <span :class="`${row.enabled ? 'bg-secondaryColor' : 'bg-warningColor'} px-2 py-1 rounded-xl text-sm text-white font-bold`">{{row.enabled ? 'Active' : 'Inactive'  }}</span>
            </template>
        </DataTable>
    </div>
</template>