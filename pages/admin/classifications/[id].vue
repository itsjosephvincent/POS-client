<script setup lang="ts">
import { storeService } from '~/components/api/StoreService'

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
const route = useRoute()
const userStore = useUserStore()
const pageStore = usePageStore()
const pageTitle = 'Classifications'
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    fetch()
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
async function fetch() {
    const sampleData = [
        { id: 1, name: 'Beverages' },
        { id: 2, name: 'Coffee' },
        { id: 3, name: 'Sandwiches' },
        { id: 4, name: 'Pasta' },
        { id: 5, name: 'Cake' },
    ]
    const data = sampleData.find(i => i.id == route.params.id)
    pageStore.setParams([data.name])
}
</script>

<template>
    <div>
        
    </div>
</template>