<script setup lang="ts">
const pageTitle = 'Stores'
const pageStore = usePageStore()
definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
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
        <SuperadminFormsStore />
    </div>
</template>