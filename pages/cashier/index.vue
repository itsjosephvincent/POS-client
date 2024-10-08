<script setup lang="ts">
import { coffee } from '~/test-data/coffee.js'

definePageMeta({
    middleware: ['auth', 'cashier'],
    layout: 'pos',
})
const pageStore = usePageStore()
const pageTitle = 'POS'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
})

</script>

<template>
    <div>
        <div class="flex justify-start items-start w-full h-[calc(100vh-159px)] overflow-y-auto overflow-x-hidden">
            <div class="p-4 pb-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 ">
                <PosItemCards v-for="item in coffee" :key="item.id" :item="item.title" :description="item.description"
                    :image-src="item.image" />
            </div>
            
        </div>
    </div>
</template>