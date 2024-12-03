<script setup lang="ts">
import { reportService } from '~/api/admin/ReportService';
import type { DataTableColumns } from '~/common/types';

const props = defineProps<{
    date: Array<Date> | null;
    store: string | null;
}>();
const itemsData = ref([]);

async function fetch() {
    try {
        let params: any = {};
        if (props.date) {
            params.date = Array.from(
                props.date.map((i: Date) => Math.floor(i.getTime() / 1000)),
            ).join(',');
        }
        if (props.store && props.store != 'all') {
            params.store = props.store;
        }
        const response = await reportService.popular(params);
        if (response && response.data) {
            itemsData.value = response.data;
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
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
watch(
    () => props.store,
    () => {
        fetch();
    },
);

const dataTableColumns: Array<DataTableColumns> = [
    { key: 'product_name', label: 'Name', sortable: false },
    { key: 'cost', label: 'Cost', sortable: false, desktopOnly: true },
    { key: 'price', label: 'Price', sortable: false, desktopOnly: true },
    {
        key: 'quantity',
        label: 'Sold Quantity',
        sortable: false,
        desktopOnly: false,
    },
    { key: 'sold', label: 'Total Income', sortable: false, desktopOnly: false },
    {
        key: 'earnings',
        label: 'Total Earnings',
        sortable: false,
        desktopOnly: true,
    },
];
</script>

<template>
    <div
        class="w-full p-4 bg-secondaryBg rounded-xl border border-primaryBorder"
    >
        <div class="text-lg my-2">Popular Items</div>
        <DataTable :columns="dataTableColumns" :data-source="itemsData" />
    </div>
</template>
