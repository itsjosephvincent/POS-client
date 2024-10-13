<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService';

const userStore = useUserStore();
const role = userStore.getRole.toLowerCase();
const data = ref([]);
const isLoading = ref(false);
const admins = computed(() => data.value);
const rowsPerPage = ref(10);
const totalPages = ref(0);
const currentPage = ref(1);

const showDeleteModal = ref(false);
const itemToDelete = ref({});

interface DataTableColumns {
    key: string;
    label: string;
    sortable: boolean;
}
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'lastname', label: 'Lastname', sortable: true },
    { key: 'firstname', label: 'Firstname', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'is_active', label: 'Active', sortable: true },
];
async function fetch(params: object | null = null) {
    try {
        isLoading.value = true;
        const response = await adminService.fetch(params);
        isLoading.value = false;
        if (response && response.data) {
            data.value = response.data;
            rowsPerPage.value = response.meta.per_page;
            totalPages.value = response.meta.last_page;
            currentPage.value = response.meta.current_page;
            console.log(data.value);
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}
onMounted(() => {
    fetch();
});
const getRowsPerPage = computed(() => rowsPerPage.value || 10);
const getTotalPages = computed(() => totalPages.value);
const getCurrentPage = computed(() => currentPage.value);
function previousPageClick() {
    fetch({ page: currentPage.value - 1 });
}
function nextPageClick() {
    fetch({ page: currentPage.value + 1 });
}
function goToPage(page: number) {
    fetch({ page });
}
function sortData(column: string, direction: string) {
    currentPage.value = 1;
    fetch({
        page: currentPage.value,
        sortField: column,
        sortOrder: direction,
    });
}
const deleteHandler = (row: object) => {
    showDeleteModal.value = true;
    itemToDelete.value = row;
};
const editHandler = (row: object) => {
    navigateTo(`/superadmin/accounts/${row?.uuid}/edit`);
};
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
];
function createButtonHandler() {
    navigateTo('/superadmin/accounts/new');
}
function filterData(value: string) {
    const params = { name: value };
    fetch(params);
}
function handleRowClick(row: object) {
    navigateTo(`/${role}/accounts/` + row.uuid);
}
async function handleDelete() {
    try {
        const uuid: string = itemToDelete.value.uuid;
        closeDeleteModal();
        await adminService.delete(uuid);
        fetch();
    } catch (error) {
        console.error(error);
    }
}
function closeDeleteModal() {
    showDeleteModal.value = false;
    itemToDelete.value = {};
}
</script>

<template>
    <div
        class="w-full flex flex-col items-center justify-center py-4 px-2 lg:mx-0"
    >
        <div class="w-full flex justify-start items-center gap-2 mb-4">
            <PrimaryButton
                label="New Account"
                icon="plus"
                @click="createButtonHandler"
            />
            <span class="grow"></span>
            <DataSearch
                class="self-end mr-4 lg:mr-0"
                placeholder="Find Account"
                @on-filter="filterData"
            />
        </div>
        <DataTable
            :columns="dataTableColumns"
            :data-source="admins"
            :actions="tableActions"
            :show-pagination="true"
            :loading="isLoading"
            :current-page="getCurrentPage"
            :rows-per-page="getRowsPerPage"
            :total-pages="getTotalPages"
            @previous-page="previousPageClick"
            @next-page="nextPageClick"
            @go-to-page="goToPage"
            @row-click="handleRowClick"
            @sort-data="sortData"
            search-placeholder="Filter admin accounts..."
        >
            <template #column-is_active="{ row }">
                <span
                    :class="`${row.is_active ? 'bg-green-400/30 text-successColor' : 'bg-orange-400/30 text-warningColor'} px-2 py-1 rounded-lg text-sm font-medium text-center`"
                    >{{ row.is_active ? 'Active' : 'Inactive' }}</span
                >
            </template>
            <template #column-enabled="{ row }">
                <span
                    :class="`${row.enabled ? 'bg-secondaryColor' : 'bg-warningColor'} px-2 py-1 rounded-xl text-sm text-white font-bold`"
                    >{{ row.enabled ? 'Active' : 'Inactive' }}</span
                >
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
            <DeleteModal
                :visible="showDeleteModal"
                @close-delete-modal="closeDeleteModal"
                @delete-confirmed="handleDelete"
            >
                <div class="flex items-center gap-4 my-4">
                    <IconSvg icon="error" color="errorColor" size="2em" />
                    <div class="text text-primaryText">
                        Are you sure you want to delete
                        <span class="font-bold"
                            >{{ itemToDelete.firstname }}
                            {{ itemToDelete.lastname }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </div>
</template>
