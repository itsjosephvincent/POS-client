<script setup lang="ts">
import { usePageStore } from '~/stores/page';

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
    <div class="h-[calc(100vh-60px)] w-full overflow-y-scroll p-4">
       
    </div>
</template>