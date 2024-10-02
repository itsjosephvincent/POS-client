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
    pageStore.setParams(['Import SKUs'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
</script>

<template>
    <div class="h-[calc(100vh-60px)] w-full flex justify-center overflow-y-scroll p-4">
        <div class="w-[90%] flex flex-col items-center justify-center">
            <div class="w-[600px] h-[200px] flex flex-col items-center justify-center  border border-dashed border-tertiaryText rounded-xl">
                <IconSvg icon="csv" color="var(--text-secondary)" size="3em" />
            </div>
            <button class="w-[600px] h-[55px] mt-4 rounded-xl border border-primaryBorder bg-secondaryColor py-2 px-3 flex justify-center items-center gap-2 text-white">
                Upload File
            </button>
        </div>
    </div>
</template>