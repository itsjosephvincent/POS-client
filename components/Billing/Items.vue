<script setup lang="ts">
import { watch } from 'vue'
import { useBillingStore } from '~/stores/billing.js'

const store = useBillingStore()

watch(() => store.items, (item: string) => {
    console.log(item)
}, { deep: true })

</script>

<template>
    <div>
        <div class="font-bold text-lg text-primaryText mx-2 xl:mx-6">Bills</div>
        <div class="mt-2 h-[calc(100vh-371px)] overflow-y-auto" ref="container-div">
            <BillingItemRow v-for="item in store.items" :image="item.imageSrc" :item="item.item" />
        </div>
    </div>
</template>