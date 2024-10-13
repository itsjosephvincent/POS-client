<script setup lang="ts">
definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
})

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

function initializePageData(data: object) {
    pageStore.setParams([`${data.firstname} ${data.lastname}`, 'Edit'])
}
</script>

<template>
    <div class="w-full px-6">
        <SuperadminAccountsFormEdit @account-fetch="initializePageData" />
    </div>
</template>