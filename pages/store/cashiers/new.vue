<script setup lang="ts">
const pageTitle = 'Cashiers'
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
    pageStore.setParams(['New Cashier'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
</script>

<template>
    <div class="w-full lg:max-w-[600px] overflow-y-scroll">
        <FormBodyCashier />
    </div>
</template>