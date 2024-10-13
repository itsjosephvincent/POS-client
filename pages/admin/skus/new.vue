<script setup lang="ts">

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
    pageStore.setParams(['Create New'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
</script>


<template>
    <div class="w-full px-6">
        <AdminProductsForm />
    </div>
</template>