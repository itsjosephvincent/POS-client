<script setup lang="ts">
const pageTitle = 'Classifications'
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
    pageStore.setParams(['New Classification'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
</script>

<template>
    <div class="w-full px-6">
        <FormBodyClassification />
    </div>
</template>