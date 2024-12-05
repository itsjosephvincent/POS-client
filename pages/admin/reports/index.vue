<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';

const pageTitle = 'Reports';
const pageStore = usePageStore();
const dateStore = useDateStore();
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
    pageStore.setParams([]);
});

const selectedDate: Ref<Array<Date> | null> = ref(dateStore.getDate || null);
const reportSelect = ref([
    { key: 'item', value: 'item', label: 'Sales by Product' },
    { key: 'category', value: 'category', label: 'Sales by Category' },
    { key: 'cashier', value: 'cashier', label: 'Sales by Cashier' },
]);
const selectedReport = ref(null);

watch(selectedDate, (value) => {
    dateStore.setDate(value);
});
</script>

<template>
    <div class="w-full px-6">
        <div class="w-full flex justify-start gap-2 items-center">
            <ReportDropdown
                :options="reportSelect"
                label="Store"
                name="store"
                placeholder="Select Store"
                v-model="selectedReport"
                :pre-selected-data="reportSelect[0]"
            />
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

        <AdminReportsItem
            v-if="selectedReport === 'item'"
            :date="selectedDate"
        />
        <AdminReportsCashier
            v-if="selectedReport === 'cashier'"
            :date="selectedDate"
        />
        <AdminReportsCategory
            v-if="selectedReport === 'category'"
            :date="selectedDate"
        />
    </div>
</template>
