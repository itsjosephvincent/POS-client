<script setup lang="ts">

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
})
const userStore = useUserStore()
const pageStore = usePageStore()
const pageTitle = 'Accounts'
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
    <div class="w-full">
        <TableAccounts />
    </div>
</template>
