<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'
import { useSetPage } from '~/composables/usePage'

definePageMeta({
    middleware: ['auth'],
})
const userStore = useUserStore()
const pageTitle = userStore.getRole !== 'Cashier' ? 'SKU' : 'POS'
useHead({
    title: pageTitle,
})

</script>

<template>
    <div class=""></div>
</template>

