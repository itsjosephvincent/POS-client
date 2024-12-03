<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { reportService } from '~/api/admin/ReportService';
import { storeService } from '~/api/admin/StoreService';
import type { Store, Admin, SuperAdmin, Cashier } from '~/common/types';
import VueDatePicker from '@vuepic/vue-datepicker';

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

const selectedDate: Ref<Array<Date> | null> = ref(null);
const summaryData: Ref<SummaryReport | null> = ref(null);

const isLoading = ref(false);

async function summaryReportFetch() {
    try {
        let params: any = {};
        if (selectedDate.value) {
            params.date = Array.from(
                selectedDate.value.map((i: Date) =>
                    Math.floor(i.getTime() / 1000),
                ),
            ).join(',');
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
watch(selectedDate, () => {
    summaryReportFetch();
});

const getTotalIncome = computed(() =>
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
            <VueDatePicker
                placeholder="Select Dates"
                class="date-picker"
                v-model="selectedDate"
                range
                :ui="{
                    input: 'date-picker-input',
                }"
            />
            <ReportDropdown
                v-if="storesData"
                :options="getStoresSelect"
                label="Store"
                name="store"
                placeholder="Select Store"
                v-model="selectedStore"
                :pre-selected-data="getStoresSelect[0]"
            />
        </div>
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <AdminDashboardInfoSummaryCard
                title="Total Income"
                :summary="getTotalIncome"
                icon="cartAdd"
            />
            <AdminDashboardInfoSummaryCard
                title="Total Earnings"
                :summary="getTotalEarnings"
                icon="sales"
            />
        </div>
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <AdminDashboardEarningsChartCard
                :date="selectedDate"
                :store="selectedStore"
            />
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

<style>
.date-picker {
    width: 340px;
    height: 40px;
}
.date-picker-input {
    border-radius: 0.75rem;
    line-height: 26px;
}
.dp__main {
    font-family: 'Poppins', sans-serif;
}
.dp__input_focus {
    border-color: var(--secondary-color);
    border-width: 2px;
}
.dp__input_icon {
    color: var(--text-primary);
}
</style>
