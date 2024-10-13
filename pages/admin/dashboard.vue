<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'Dashboard';
const pageStore = usePageStore();
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
});

const data = [
    {
        name: 'A&W Fast Food',
        data: [
            { date: new Date(2025, 0, 1), value: 120000 },
            { date: new Date(2025, 1, 1), value: 50000 },
            { date: new Date(2025, 2, 1), value: 40000 },
            { date: new Date(2025, 3, 1), value: 90000 },
            { date: new Date(2025, 4, 1), value: 120000 },
            { date: new Date(2025, 5, 1), value: 140000 },
            { date: new Date(2025, 6, 1), value: 120000 },
        ],
    },
    {
        name: 'Happy Pet Shop',
        data: [
            { date: new Date(2025, 0, 1), value: 50000 },
            { date: new Date(2025, 1, 1), value: 90000 },
            { date: new Date(2025, 2, 1), value: 85000 },
            { date: new Date(2025, 3, 1), value: 70000 },
            { date: new Date(2025, 4, 1), value: 160000 },
            { date: new Date(2025, 5, 1), value: 70000 },
            { date: new Date(2025, 6, 1), value: 180000 },
        ],
    },
    {
        name: 'KC Convenience Store',
        data: [
            { date: new Date(2025, 0, 1), value: 40000 },
            { date: new Date(2025, 1, 1), value: 50000 },
            { date: new Date(2025, 2, 1), value: 80000 },
            { date: new Date(2025, 3, 1), value: 90000 },
            { date: new Date(2025, 4, 1), value: 70000 },
            { date: new Date(2025, 5, 1), value: 50000 },
            { date: new Date(2025, 6, 1), value: 60000 },
        ],
    },
];
</script>

<template>
    <div class="w-full px-2 md:px-4">
        <AdminDashboardDatePicker />
        <div class="w-full flex flex-wrap gap-4">
            <AdminDashboardInfoSummaryCard
                title="Sales Today"
                summary="9500.00"
                icon="cartAdd"
            />
            <AdminDashboardInfoSummaryCard
                title="Total Earnings"
                summary="120,000.00"
                icon="sales"
            />
            <AdminDashboardInfoSummaryCard
                title="Total Orders"
                summary="120"
                icon="orders"
            />
            <AdminDashboardInfoSummaryCard
                title="Stores Open"
                summary="3"
                icon="warehouse"
            />
            <AdminDashboardPopularItems />
            <AdminDashboardEarningsChartCard :data="data" />
            <AdminDashboardCategoriesRevenueCard />
        </div>
    </div>
</template>
