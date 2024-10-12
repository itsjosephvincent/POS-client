<script setup lang="ts">

interface DataTableColumns {
    key: string
    label: string
    sortable: boolean
}
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'cost', label: 'Cost', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'sold', label: 'Sold Quantity', sortable: true },
    { key: 'income', label: 'Total Income', sortable: true },
]
const data: Array<object> = [
    { name: 'Chai Latte (M)', cost: 80.00, price: 120.00, sold: 1200, income: 48000.00 },
    { name: 'Coke 1L', cost: 30.00, price: 50.00, sold: 2340, income: 46800.00 },
]

</script>

<template>
    <div class="p-4 bg-secondaryBg rounded-xl border border-primaryBorder">
        <div class="text-lg my-2">Popular Items</div>
        <DataTable :columns="dataTableColumns" :data-source="data" />
    </div>
</template>