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
})

function initializePageData(data: object) {
    pageStore.setParams([`${data.store_name} ${data.branch}`, 'Edit'])
}
</script>

<template>
    <div class="w-full px-6">
        <AdminStoresFormEdit @store-fetch="initializePageData" />
    </div>
</template>