<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { reportService } from '~/api/store/ReportService';
import type { Store, Admin, SuperAdmin, Cashier } from '~/common/types';

const pageTitle = 'Dashboard';
const pageStore = usePageStore();
definePageMeta({
    layout: 'store',
    middleware: ['store'],
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

const selectedDate: Ref<string | null> = ref(null);
const summaryData: Ref<SummaryReport | null> = ref(null);

const isLoading = ref(false);

async function summaryReportFetch() {
    try {
        let params: any = {};
        if (selectedDate.value) {
            params.date = selectedDate.value;
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

onMounted(() => {
    pageStore.setPage(pageTitle);
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
</script>

<template>
    <div class="w-full px-2 md:px-4 pb-10">
        <div class="w-full flex justify-start gap-2 items-center mb-4">
            <AdminOrdersDatePicker @date-changed="onDateChanged" />
        </div>
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <StoreDashboardInfoSummaryCard
                title="Total Sales"
                :summary="getTotalSales"
                icon="cartAdd"
            />
            <StoreDashboardInfoSummaryCard
                title="Total Earnings"
                :summary="getTotalEarnings"
                icon="sales"
            />
            <StoreDashboardCategoriesRevenueCard :date="selectedDate" />
        </div>
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <StoreDashboardPopularItems :date="selectedDate" />
        </div>
    </div>
</template>
