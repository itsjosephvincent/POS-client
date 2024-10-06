<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const pageTitle = 'SKUs'
const pageStore = usePageStore()

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})
function initializePageData(product: object) {
    pageStore.setParams([product.name])
}

</script>


<template>
    <div class="w-full">
        <ProductDisplayItem @product-fetch="initializePageData" />
    </div>
</template>