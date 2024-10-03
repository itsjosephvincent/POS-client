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
    pageStore.setParams(['New SKU'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
const classificationOptions = [
    { id: 1, value: 'beverages', label: 'Beverages', },
    { id: 2, value: 'coffee', label: 'Coffee', },
    { id: 3, value: 'sandwiches', label: 'Sandwiches', },
    { id: 3, value: 'pasta', label: 'Pasta', },
    { id: 3, value: 'cake', label: 'Cake', },
]
</script>

<template>
    <div class="h-[calc(100vh-60px)] w-full max-w-[400px] overflow-y-scroll p-4 ml-6">
        <FormTextInput class="my-3" name="product" placeholder="Enter Product Name" label="Product" bg-class="bg-secondaryBg"
            border-class="border border-primaryBorder" />
        <FormSelect class="my-3" name="classification" placeholder="Select Classification" label="Classification" :options="classificationOptions"  />
        <FormTextInput class="my-3" type="number" name="cogs" placeholder="Enter Cost of Goods" label="Cost of Goods" bg-class="bg-secondaryBg"
            border-class="border border-primaryBorder" />
        <FormTextInput class="my-3" type="number" name="srp" placeholder="Enter Suggested Retail Price" label="SRP" bg-class="bg-secondaryBg"
            border-class="border border-primaryBorder" />
        <FormTextInput class="my-3" type="number" name="inventory" placeholder="Enter Current Inventory Count" label="Inventory Count" bg-class="bg-secondaryBg"
            border-class="border border-primaryBorder" />
        <PrimaryButton class="w-full my-3" label="Save" />
    </div>
</template>