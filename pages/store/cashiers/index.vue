<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'

definePageMeta({
    layout: 'store',
    middleware: ['store'],
})

const pageStore = usePageStore()
const pageTitle = 'Cashiers'
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
        <TableCashiers />
    </div>
</template>
