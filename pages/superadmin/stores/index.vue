<script setup lang="ts">
definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
})

const pageStore = usePageStore()
const pageTitle = 'Stores'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})


</script>

<template>
    <div class="w-full px-6">
        <TableStores />
    </div>
</template>
