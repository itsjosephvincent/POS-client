<script setup lang="ts">
import { cashierService } from '~/api/store/CashierService';
import type { DataTableColumns, Cashier, Store } from '~/common/types';

const userStore = useUserStore();
const user: Store | null = userStore.getUser;

const data = ref([]);
const admins = computed(() => data.value);
const rowsPerPage = ref(10);
const totalPages = ref(0);
const currentPage = ref(1);
const sortField = ref('');
const sortOrder = ref('ascend');
const filter = ref('');

const showDeleteModal = ref(false);
const itemToDelete: Ref<Cashier | null> = ref(null);

const isLoading = ref(false);

const dataTableColumns: Array<DataTableColumns> = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'is_active', label: 'Active', sortable: true },
];
function columnHeaderClass(column: string) {
    return column === 'is_active' ? 'justify-center' : '';
}
function columnClass(row: Cashier, columnKey: string) {
    return columnKey === 'is_active' ? 'text-center' : '';
}
const deleteHandler = (row: Cashier) => {
    showDeleteModal.value = true;
    itemToDelete.value = row;
};
const editHandler = (row: Cashier) => {
    navigateTo(`/store/cashiers/${row?.uuid}/edit`);
};
async function fetch() {
    try {
        if (!user || !user.id) {
            throw 'user store not set.';
        }
        isLoading.value = true;
        const params = {
            store_id: user.id,
            page: currentPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            name: filter.value,
        };
        const response = await cashierService.fetch(params);
        isLoading.value = false;
        if (response && response.data) {
            data.value = response.data;
            rowsPerPage.value = response.meta.per_page;
            totalPages.value = response.meta.last_page;
            currentPage.value = response.meta.current_page;
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

// pagination
const getRowsPerPage = computed(() => rowsPerPage.value || 10);
const getTotalPages = computed(() => totalPages.value);
const getCurrentPage = computed(() => currentPage.value);
function filterData(value: string) {
    filter.value = value;
    fetch();
}
function previousPageClick() {
    currentPage.value -= 1;
    fetch();
}
function nextPageClick() {
    currentPage.value += 1;
    fetch();
}
function goToPage(page: number) {
    currentPage.value = page;
    fetch();
}
function sortData(column: string, direction: string) {
    currentPage.value = 1;
    sortField.value = column;
    sortOrder.value = direction;
    fetch();
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
];
function handleRowClick(row: Cashier) {
    navigateTo(`/store/cashiers/${row.uuid}`);
}
function createButtonHandler() {
    navigateTo(`/store/cashiers/new`);
}

async function handleDelete() {
    try {
        if (!itemToDelete || !itemToDelete.value) {
            throw 'cashier to delete is none.';
        }
        const uuid: string = itemToDelete.value.uuid;
        closeDeleteModal();
        await cashierService.delete(uuid);
        fetch();
    } catch (error) {
        console.error(error);
    }
}

function closeDeleteModal() {
    showDeleteModal.value = false;
    itemToDelete.value = null;
}
</script>

<template>
    <div
        class="w-full flex flex-col items-center justify-center py-4 px-2 lg:mx-0"
    >
        <div class="w-full flex justify-start items-center gap-2 mb-4">
            <PrimaryButton
                label="New Cashier"
                icon="plus"
                @click="createButtonHandler"
            />
            <span class="grow"></span>
            <DataSearch
                class="self-end mr-4 lg:mr-0"
                placeholder="Find Cashier"
                @on-filter="filterData"
            />
        </div>
        <DataTable
            :columns="dataTableColumns"
            :data-source="admins"
            :actions="tableActions"
            :show-pagination="true"
            :column-class="columnClass"
            :column-header-class="columnHeaderClass"
            :loading="isLoading"
            :current-page="getCurrentPage"
            :rows-per-page="getRowsPerPage"
            :total-pages="getTotalPages"
            @previous-page="previousPageClick"
            @next-page="nextPageClick"
            @go-to-page="goToPage"
            @sort-data="sortData"
            @row-click="handleRowClick"
            search-placeholder="Filter admin accounts..."
        >
            <template #column-is_active="{ row }">
                <span
                    :class="`${row.is_active ? 'bg-green-400/30 text-successColor' : 'bg-orange-400/30 text-warningColor'} px-2 py-1 rounded-lg text-sm font-medium text-center`"
                    >{{ row.is_active ? 'Active' : 'Inactive' }}</span
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
                        Are you sure you want to delete cashier
                        <span class="font-bold">{{ itemToDelete?.name }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </div>
</template>
