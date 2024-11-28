<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { reportService } from '~/api/admin/ReportService';
import { storeService } from '~/api/admin/StoreService';
import type { Store, Admin, SuperAdmin, Cashier } from '~/common/types';

const pageTitle = 'Dashboard';
const pageStore = usePageStore();
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
useHead({
    title: pageTitle,
});

const userStore = useUserStore();
const user: SuperAdmin | Admin | Store | Cashier | null = userStore.getUser;

interface SummaryReport {
    total_payments: string;
    total_cost: string;
    total_earnings: string;
    date: string;
}

const storesData: Ref<Array<Store> | null> = ref(null);
const selectedStore = ref(null);

const selectedDate: Ref<string | null> = ref(null);
const summaryData: Ref<SummaryReport | null> = ref(null);

const isLoading = ref(false);

async function summaryReportFetch() {
    try {
        let params: any = {};
        if (selectedDate.value) {
            params.date = selectedDate.value;
        }
        if (selectedStore.value && selectedStore.value != 'all') {
            params.store = selectedStore.value;
        }
        const response = await reportService.summary(params);
        if (response && response.data) {
            summaryData.value = response.data;
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
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

onMounted(() => {
    pageStore.setPage(pageTitle);
    summaryReportFetch();
    storesFetch();
});

watch(selectedStore, () => {
    summaryReportFetch();
});

function onDateChanged(date: string) {
    selectedDate.value = date;
    summaryReportFetch();
}

const getTotalSales = computed(() =>
    summaryData.value ? summaryData.value.total_payments : '0.00',
);
const getTotalEarnings = computed(() =>
    summaryData.value ? summaryData.value.total_earnings : '0.00',
);
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
    <div class="w-full px-2 md:px-4 pb-10">
        <div class="w-full flex justify-start gap-2 items-center mb-4">
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
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <AdminDashboardInfoSummaryCard
                title="Total Sales"
                :summary="getTotalSales"
                icon="cartAdd"
            />
            <AdminDashboardInfoSummaryCard
                title="Total Earnings"
                :summary="getTotalEarnings"
                icon="sales"
            />
        </div>
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <AdminDashboardEarningsChartCard :date="selectedDate" />
            <AdminDashboardCategoriesRevenueCard
                :date="selectedDate"
                :store="selectedStore"
            />
            <AdminDashboardPopularItems
                :date="selectedDate"
                :store="selectedStore"
            />
        </div>
    </div>
</template>
