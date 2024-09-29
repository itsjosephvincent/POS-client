<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'

definePageMeta({
    middleware: ['auth'],
})
const userStore = useUserStore()
const pageStore = usePageStore()
const pageTitle = userStore.getRole !== 'Cashier' ? 'Accounts' : 'POS'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})

</script>

<template>
    <div class="flex justify-center items-start h-[calc(100%-152px)] w-full">
        <div v-if="userStore.getRole === 'SuperAdmin'" class="overflow-y-auto p-4 pb-4 flex flex-col grow sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start">
            <AccountsAdminPage />
        </div>
    </div>
</template>
