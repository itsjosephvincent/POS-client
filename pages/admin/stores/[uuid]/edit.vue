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
    <div class="h-[calc(100vh-60px)] w-full lg:max-w-[600px] overflow-y-scroll bg-secondaryBg lg:bg-primaryBg lg:p-4 lg:ml-6">
        <FormBodyStoreEdit @store-fetch="initializePageData" />
    </div>
</template>