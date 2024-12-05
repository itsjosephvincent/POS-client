<script setup lang="ts">
import { reportService } from '~/api/admin/ReportService';
import type { DataTableColumns } from '~/common/types';

const props = defineProps<{
    date: Array<Date> | null;
}>();
const itemsData = ref([]);
const isLoading = ref(false);

async function fetch() {
    try {
        let params: any = {};
        if (props.date) {
            params.date = Array.from(
                props.date.map((i: Date) => Math.floor(i.getTime() / 1000)),
            ).join(',');
        }
        isLoading.value = true;
        const response = await reportService.category_sales(params);
        isLoading.value = false;
        if (response && response.data) {
            itemsData.value = response.data;
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}
watch(
    () => props.date,
    () => {
        fetch();
    },
    { immediate: true },
);
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'name', label: 'Category', sortable: false },
    {
        key: 'items_sold',
        label: 'Items Sold',
        sortable: false,
        desktopOnly: true,
    },
    {
        key: 'net_sales',
        label: 'Net Sales',
        sortable: false,
        desktopOnly: true,
    },
    {
        key: 'cogs',
        label: 'Cost of Goods',
        sortable: false,
        desktopOnly: false,
    },
    {
        key: 'gross_profit',
        label: 'Gross Profit',
        sortable: false,
        desktopOnly: false,
    },
];
</script>

<template>
    <div class="w-full mt-4 rounded-xl p-6 min-h-60 bg-secondaryBg">
        <DataTable
            :columns="dataTableColumns"
            :data-source="itemsData"
            :loading="isLoading"
        />
    </div>
</template>
