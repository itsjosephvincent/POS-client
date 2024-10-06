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
    pageStore.setParams([])
})

</script>

<template>
    <div id="products-page" class="h-[calc(100vh-60px)] w-[90%] flex flex-col items-center justify-start  overflow-y-scroll bg-secondaryBg lg:bg-primaryBg lg:p-4 lg:ml-6">
        <TableProducts />
    </div>
</template>