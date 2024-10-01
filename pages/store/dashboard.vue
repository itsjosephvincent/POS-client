<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'Dashboard'
const pageStore = usePageStore()
definePageMeta({
    layout: 'store',
    middleware: ['store'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})
</script>

<template>
    <div>
        
    </div>
</template>