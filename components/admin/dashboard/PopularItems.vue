<script setup lang="ts">
import { reportService } from '~/api/admin/ReportService';

interface DataTableColumns {
    key: string;
    label: string;
    sortable: boolean;
}

const props = defineProps<{
    date: string | null;
    store: string | null;
}>();
const itemsData = ref([]);

async function fetch() {
    try {
        let params: any = {};
        if (props.date) {
            params.date = props.date;
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
    { key: 'product_name', label: 'Name', sortable: true },
    { key: 'cost', label: 'Cost', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'quantity', label: 'Sold Quantity', sortable: true },
    { key: 'sold', label: 'Total Income', sortable: true },
    { key: 'earnings', label: 'Total Earnings', sortable: true },
];
</script>

<template>
    <div class="p-4 bg-secondaryBg rounded-xl border border-primaryBorder">
        <div class="text-lg my-2">Popular Items</div>
        <DataTable :columns="dataTableColumns" :data-source="itemsData" />
    </div>
</template>
