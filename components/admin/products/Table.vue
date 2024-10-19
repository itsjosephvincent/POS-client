<script setup lang="ts">
import { productService } from '~/api/admin/ProductService';
import type {
    Admin,
    DataTableColumns,
    Product,
    Category,
} from '~/common/types';

const viewport = useViewport();
const userStore = useUserStore();
const user: Admin | null = userStore.getUser;

const isLoading = ref(false);
const productsData = ref([]);
const rowsPerPage = ref(10);
const totalPages = ref(0);
const currentPage = ref(1);
const sortField = ref('');
const sortOrder = ref('ascend');
const filter = ref('');

const getRowsPerPage = computed(() => rowsPerPage.value || 10);
const getTotalPages = computed(() => totalPages.value);
const getCurrentPage = computed(() => currentPage.value);

onMounted(() => {
    fetch();
});

const dataTableColumns: Array<DataTableColumns> = [
    { key: 'image', label: '', sortable: false },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'category_name', label: 'Category', sortable: false },
    { key: 'cost', label: 'Cost of Goods', sortable: true },
    { key: 'price', label: 'SRP', sortable: true },
    { key: 'inventory', label: 'Inventory Count', sortable: true },
];
const editHandler = (row: Product) => {
    navigateTo(`/admin/skus/${row?.uuid}/edit`);
};
const deleteHandler = (row: Product) => {
    showDeleteModal.value = true;
    itemToDelete.value = row;
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
async function fetch() {
    try {
        isLoading.value = true;
        const params = {
            admin: user?.uuid,
            page: currentPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            name: filter.value, // filter store names
        };
        const response = await productService.all(params);
        isLoading.value = false;
        if (response.data) {
            productsData.value = response.data.map((d: object) => {
                if (d.category) {
                    d.category_uuid = d.category.uuid;
                    d.category_name = d.category.name;
                }
                delete d.category;
                return d;
            });
            rowsPerPage.value = response.meta.per_page;
            totalPages.value = response.meta.last_page;
            currentPage.value = response.meta.current_page;
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}

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

function columnHeaderClass(column: string) {
    return column === 'cost' || column === 'price' || column === 'inventory'
        ? 'justify-end'
        : '';
}
function columnClass(row: Product, columnKey: string) {
    if (columnKey === 'image') return 'max-w-[90px] pl-4';
    return columnKey === 'cost' ||
        columnKey === 'price' ||
        columnKey === 'inventory'
        ? 'text-right'
        : '';
}
function handleRowClick(row: Product) {
    navigateTo(`/admin/skus/${row.uuid}`);
}
function createButtonHandler() {
    navigateTo(`/admin/skus/new`);
}
function importButtonHandler() {
    navigateTo(`/admin/skus/import`);
}

const showDeleteModal = ref(false);
const itemToDelete: Ref<Product | null> = ref(null);
async function handleDelete() {
    try {
        if (!itemToDelete.value || !itemToDelete.value.uuid) {
            throw 'item to delete uuid is null.';
        }
        const uuid: string = itemToDelete.value.uuid;
        closeDeleteModal();
        await productService.delete(uuid);
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
                label="New SKU"
                icon="plus"
                @click="createButtonHandler"
            />
            <PrimaryButton
                class=""
                icon="import"
                label="Import SKUs"
                @click="importButtonHandler"
            />
            <span class="grow"></span>
            <DataSearch
                class="self-end mr-4 lg:mr-0"
                placeholder="Find Products"
                @on-filter="filterData"
            />
        </div>
        <DataList
            v-if="viewport.isLessThan('desktop')"
            :data-source="productsData"
            :loading="isLoading"
            :delete-handler="deleteHandler"
            :edit-handler="editHandler"
            :show-pagination="true"
            :current-page="getCurrentPage"
            :rows-per-page="getRowsPerPage"
            :total-pages="getTotalPages"
            @previous-page="previousPageClick"
            @next-page="nextPageClick"
            @go-to-page="goToPage"
        />
        <DataTable
            v-else
            :loading="isLoading"
            :columns="dataTableColumns"
            :data-source="productsData"
            :column-class="columnClass"
            :actions="tableActions"
            :has-create-button="true"
            create-button-label="New SKU"
            :column-header-class="columnHeaderClass"
            @row-click="handleRowClick"
            :create-button-handler="createButtonHandler"
            :show-pagination="true"
            :current-page="getCurrentPage"
            :rows-per-page="getRowsPerPage"
            :total-pages="getTotalPages"
            @previous-page="previousPageClick"
            @next-page="nextPageClick"
            @go-to-page="goToPage"
            @sort-data="sortData"
        >
            <template #column-image="{ row, column }">
                <div
                    class="hidden w-full min-w-[100px] rounded-full md:flex items-center justify-center py-2"
                >
                    <img
                        v-if="row[column.key]"
                        :src="row[column.key]"
                        :alt="row.name"
                        class="object-fill rounded-full h-[40px] w-[40px]"
                    />
                </div>
            </template>
            <template #action-edit="{ action }">
                <button class="p-2 rounded-full hover:bg-sky-500/30">
                    <IconSvg icon="edit" color="secondaryColor" size="1.2em" />
                </button>
            </template>
            <template #action-delete="{ action }">
                <button class="p-2 rounded-full hover:bg-red-500/30">
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
                        <span class="font-bold">{{
                            itemToDelete?.name || 'this product'
                        }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </div>
</template>
