<script setup lang="ts">
import { watch, computed } from 'vue'
import { useBillingStore } from '~/stores/billing.js'

const store = useBillingStore()

// watch(() => store.items, (item: string) => {
//     console.log(item)
// }, { deep: true })

const hasBilling = computed(() => store.getItems.length > 0)

</script>

<template>
    <div class="w-full h-screen flex flex-col bg-secondaryBg border-l border-primaryBorder">
        <BillingCashier />
        <BillingItems class="my-2 grow" />
        <BillingTotal class="" v-if="hasBilling" />
        <BillingPayment class="" v-if="hasBilling" />
    </div>
</template>
