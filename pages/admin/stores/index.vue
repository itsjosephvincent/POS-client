<script setup lang="ts">

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})

const pageStore = usePageStore()
const pageTitle = 'Stores'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    pageStore.setParams([])
})

</script>

<template>
    <div class="w-full px-6">
        <AdminStoresTable />
    </div>
</template>
