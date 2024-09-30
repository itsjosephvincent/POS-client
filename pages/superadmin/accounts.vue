<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'

definePageMeta({
    layout: 'superadmin',
    middleware: ['auth'],
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

</script>

<template>
    <div class="h-[calc(100vh-60px)] overflow-y-scroll">
        <AccountsAdminPage />
    </div>
</template>
