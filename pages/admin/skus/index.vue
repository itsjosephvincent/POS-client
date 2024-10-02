<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'SKUs'
const pageStore = usePageStore()
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
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
const dataTableColumns: Array<DataTableColumns> = [
    { key: 'name', label: 'Name' },
    { key: 'classification', label: 'Classification' },
    { key: 'cogs', label: 'Cost of Goods' },
    { key: 'srp', label: 'SRP' },
    { key: 'inventory_count', label: 'Inventory Count' },
]
const sampleData = [
    { id: 1,name:'Coke', classification: 'Beverages', cogs: '50.00', srp: '75.00', inventory_count: 10 },
    { id: 2,name:'White Choco Mocha(S)', classification: 'Coffee', cogs: '70.00', srp: '165.00', inventory_count: 25 },
    { id: 3,name:'Bacon Cheese Burger', classification: 'Sandwiches', cogs: '85.00', srp: '210.00', inventory_count: 35 },
    { id: 4,name:'Sausage Pasta', classification: 'Pasta', cogs: '105.00', srp: '225.00', inventory_count: 15 },
]
function columnHeaderClass(column) {
    return column === 'cogs' || column === 'srp' || column === 'inventory_count'
        ? 'justify-end' : ''
}
function columnClass(row, columnKey) {
    return columnKey === 'cogs' || columnKey === 'srp' || columnKey === 'inventory_count'
        ? 'text-right' : ''
}
function handleRowClick(row: object) {
    navigateTo('/admin/skus/' + row.id)
}
function createButtonHandler() {
    navigateTo('/admin/skus/new')
}
function importButtonHandler() {
    navigateTo('/admin/skus/import')
}
</script>

<template>
    <div class="h-[calc(100vh-60px)] flex flex-col items-center  overflow-y-scroll">
        <div class="w-[90%] flex flex-col items-center justify-center py-4">
            <div class="w-full flex justify-start items-center gap-2 mb-4">
                <AddNewButton label="New SKU" @click="createButtonHandler" />
                <AddNewButton class="grow" label="Import SKUs" @click="importButtonHandler" />
                <DataSearch class="self-end" placeholder="Find items..." />
            </div>
            <DataTable :columns="dataTableColumns" :data-source="sampleData" :column-class="columnClass" :has-create-button="true" create-button-label="New SKU"
                :column-header-class="columnHeaderClass" @row-click="handleRowClick" :create-button-handler="createButtonHandler"
            />
        </div>
    </div>
</template>