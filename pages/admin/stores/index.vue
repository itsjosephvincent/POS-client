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
    <div class="h-[calc(100vh-60px)] flex flex-col items-center  overflow-y-scroll">
        <TableStores />
    </div>
</template>
