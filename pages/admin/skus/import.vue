<script setup lang="ts">
import { usePageStore } from '~/stores/page';

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
    pageStore.setParams(['Import SKUs'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})

</script>

<template>
    <div class="w-full px-6">
        <FormBodyImportSku />
    </div>
</template>