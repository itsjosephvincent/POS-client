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
    <div class="w-full px-2 md:px-4 lg:max-w-[600px] overflow-y-scroll">
        <FormBodyProduct />
    </div>
</template>