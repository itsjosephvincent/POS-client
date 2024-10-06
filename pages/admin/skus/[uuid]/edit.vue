<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})

const pageStore = usePageStore()
const pageTitle = 'SKUs'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})

function initializePageData(data: object) {
    pageStore.setParams([data.name, 'Edit'])
}
</script>

<template>
    <div class="w-full lg:max-w-[600px] overflow-y-scroll">
        <FormBodyProductEdit @product-fetch="initializePageData" />
    </div>
</template>