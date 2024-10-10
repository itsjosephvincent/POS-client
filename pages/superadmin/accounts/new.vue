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
    <div class="w-full lg:max-w-[600px] overflow-y-scroll">
        <FormBodyAccount />
    </div>
</template>