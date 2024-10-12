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
    pageStore.setParams(['Create New'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})

</script>

<template>
    <div class="w-full px-6">
        <FormBodyAccount />
    </div>
</template>