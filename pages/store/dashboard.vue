<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { reportService } from '~/api/store/ReportService';
import type { Store, Admin, SuperAdmin, Cashier } from '~/common/types';
import VueDatePicker from '@vuepic/vue-datepicker';

const pageTitle = 'Dashboard';
const pageStore = usePageStore();
const dateStore = useDateStore();
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

const selectedDate: Ref<Array<Date> | null> = ref(dateStore.getDate || null);
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

watch(selectedDate, (value) => {
    dateStore.setDate(value);
    summaryReportFetch();
});

const getTotalIncome = computed(() =>
    summaryData.value ? summaryData.value.total_payments : '0.00',
);
const getTotalEarnings = computed(() =>
    summaryData.value ? summaryData.value.total_earnings : '0.00',
);
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
        </div>
        <div class="w-full flex flex-wrap gap-4 mb-4">
            <StoreDashboardInfoSummaryCard
                title="Total Income"
                :summary="getTotalIncome"
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
