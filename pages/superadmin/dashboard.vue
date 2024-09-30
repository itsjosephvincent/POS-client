<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'Dashboard'
const pageStore = usePageStore()
definePageMeta({
    layout: 'superadmin',
    middleware: ['auth',],
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
        Superadmin dashboard
    </div>
</template>