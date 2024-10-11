<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'Dashboard'
const pageStore = usePageStore()
definePageMeta({
    layout: 'store',
    middleware: ['store'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})

const data = [
    {
        name: 'Happy Pet Shop',
        data: [
            { store: 'Happy Pet Shop',date: new Date(2025, 0, 1), value: 50000 },
            { store: 'Happy Pet Shop',date: new Date(2025, 1, 1), value: 90000 },
            { store: 'Happy Pet Shop',date: new Date(2025, 2, 1), value: 85000 },
            { store: 'Happy Pet Shop',date: new Date(2025, 3, 1), value: 70000 },
            { store: 'Happy Pet Shop',date: new Date(2025, 4, 1), value: 160000 },
            { store: 'Happy Pet Shop',date: new Date(2025, 5, 1), value: 70000 },
            { store: 'Happy Pet Shop',date: new Date(2025, 6, 1), value: 180000 },
        ]
    },
]

</script>

<template>
    <div class="w-full px-2 md:px-4">
        <div class="w-full flex flex-wrap gap-4">
            <ReportEarningsChartCard :data="data" />
            <ReportInfoSummaryCard title="Sales Today" summary="9500.00" icon="cartAdd" />
            <ReportInfoSummaryCard title="Total Earnings" summary="120,000.00" icon="sales" />
            <ReportInfoSummaryCard title="Total Orders" summary="120" icon="orders" />
        </div>
    </div>
</template>