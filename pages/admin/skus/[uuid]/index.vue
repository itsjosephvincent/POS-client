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
    <div class="h-[calc(100vh-60px)] w-full lg:max-w-[600px] overflow-y-scroll bg-secondaryBg lg:bg-primaryBg lg:p-4 lg:ml-6">
        <ProductDisplay @product-fetch="initializePageData" />
    </div>
</template>