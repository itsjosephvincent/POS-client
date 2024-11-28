<script setup lang="ts">
import { orderService } from '~/api/admin/OrderService';
import { storeService } from '~/api/admin/StoreService';
import type {
    DataTableColumns,
    Admin,
    Order,
    Store,
    SuperAdmin,
    Cashier,
} from '~/common/types';

const userStore = useUserStore();
const user: SuperAdmin | Admin | Store | Cashier | null = userStore.getUser;

const storesData: Ref<Array<Store> | null> = ref(null);
const selectedStore = ref(null);

const selectedDate: Ref<String | null> = ref(null);

const data = ref([]);
const rowsPerPage = ref(10);
const totalPages = ref(0);
const currentPage = ref(1);
const sortField = ref('');
const sortOrder = ref('descend');
const filter = ref('');

const isLoading = ref(false);

async function fetch() {
    try {
        let params: any = {
            admin_id: user?.id,
            page: currentPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            name: filter.value, // filter store names
        };
        if (selectedStore.value && selectedStore.value != 'all') {
            params.store = selectedStore.value;
        }
        if (selectedDate.value) {
            params.date = selectedDate.value;
        }
        isLoading.value = true;
        const response = await orderService.all(params);
        isLoading.value = false;
        if (response && response.data) {
            data.value = response.data;
            rowsPerPage.value = response.per_page;
            totalPages.value = response.last_page;
            currentPage.value = response.current_page;
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}
async function storesFetch() {
    try {
        const params = {
            admin_id: user?.id,
        };
        const response = await storeService.stores(params);
        isLoading.value = false;
        if (response && response.data) {
            storesData.value = response.data;
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}

const dataTableColumns: Array<DataTableColumns> = [
    { key: 'order_number', label: 'Order', sortable: true },
    { key: 'store_name', label: 'Store', sortable: true },
    { key: 'cashier_name', label: 'Cashier', sortable: true },
    { key: 'payment', label: 'Payment', sortable: true },
    { key: 'created_at', label: 'Date', sortable: true },
];

onMounted(() => {
    fetch();
    storesFetch();
});

watch(selectedStore, () => {
    fetch();
});

function columnHeaderClass(column: string) {
    return column === 'is_active' ? 'justify-center' : '';
}
function columnClass(row: object, columnKey: string) {
    return columnKey === 'is_active' ? 'text-center' : '';
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
function handleRowClick(row: Order) {
    if (row && row.uuid) {
        navigateTo(`/admin/orders/` + row.uuid);
    }
}
function formatDateTime(dateTime: string) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours: string | number = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    hours = String(hours).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

function onDateChanged(date: string) {
    selectedDate.value = date;
    fetch();
}

const getRowsPerPage = computed(() => rowsPerPage.value || 10);
const getTotalPages = computed(() => totalPages.value);
const getCurrentPage = computed(() => currentPage.value);
const getStoresSelect = computed(() => {
    if (!storesData.value) return null;
    let stores: any = [
        {
            key: 'all',
            value: 'all',
            label: 'All Stores',
        },
    ];
    stores = [
        ...stores,
        ...storesData.value.map((d: Store) => ({
            key: d.uuid,
            value: d.uuid,
            label: `${d.store_name} ${d.branch}`,
        })),
    ];
    return stores;
});
</script>

<template>
    <div
        class="w-full flex flex-col items-center justify-center py-4 px-2 lg:mx-0"
    >
        <div class="w-full flex justify-between items-center mb-4">
            <div class="w-full flex justify-between gap-2 items-center">
                <ReportDropdown
                    v-if="storesData"
                    :options="getStoresSelect"
                    label="Store"
                    name="store"
                    placeholder="Select Store"
                    v-model="selectedStore"
                    :pre-selected-data="getStoresSelect[0]"
                />
                <AdminOrdersDatePicker @date-changed="onDateChanged" />
            </div>
            <!-- <AdminOrdersTableFilter /> -->
        </div>
        <DataTable
            :loading="isLoading"
            :columns="dataTableColumns"
            :data-source="data"
            :has-create-button="true"
            :column-class="columnClass"
            :column-header-class="columnHeaderClass"
            :show-pagination="true"
            :current-page="getCurrentPage"
            :rows-per-page="getRowsPerPage"
            :total-pages="getTotalPages"
            @previous-page="previousPageClick"
            @next-page="nextPageClick"
            @go-to-page="goToPage"
            @sort-data="sortData"
            @row-click="handleRowClick"
            search-placeholder="Filter Orders"
        >
            <template #column-store_name="{ row }">
                <span>{{ row.store_name }} {{ row.branch }}</span>
            </template>
            <template #column-created_at="{ row }">
                <span class="block text-right">{{
                    formatDateTime(row.created_at)
                }}</span>
            </template>
            <template #column-payment="{ row }">
                <span class="block text-right">{{ row.payment }}</span>
            </template>
        </DataTable>
    </div>
</template>
