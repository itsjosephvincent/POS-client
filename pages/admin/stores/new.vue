<script setup lang="ts">
const pageTitle = 'Stores'
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
    pageStore.setParams(['New Store'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
</script>

<template>
    <div class="w-full px-6">
        <SuperadminStoresForm />
    </div>
</template>