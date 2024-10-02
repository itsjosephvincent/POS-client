<script setup lang="ts">
import { storeService } from '~/components/api/StoreService'

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
const route = useRoute()
const userStore = useUserStore()
const pageStore = usePageStore()
const pageTitle = 'SKUs'
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
    // try {
    //     let params = {
    //         admin_id: userStore.getUser.id,
    //     }
    //     const response = await storeService.store(route.params.uuid, params)
    //     if (response && response.data) {
    //         console.log(response)
    //         const data = response.data
    //         pageStore.setParams([data.store_name + ' ' + data.branch])
    //     } else {
    //         throw 'Empty data.'
    //     }

    // } catch (error) {
    //     console.error(error)
    // }
    const sampleData = [
        { id: 1,name:'Coke', classification: 'Beverages', cogs: '50.00', srp: '75.00', inventory_count: 10 },
        { id: 2,name:'White Choco Mocha(S)', classification: 'Coffee', cogs: '70.00', srp: '165.00', inventory_count: 25 },
        { id: 3,name:'Bacon Cheese Burger', classification: 'Sandwiches', cogs: '85.00', srp: '210.00', inventory_count: 35 },
        { id: 4,name:'Sausage Pasta', classification: 'Pasta', cogs: '105.00', srp: '225.00', inventory_count: 15 },
    ]
    const data = sampleData.find(i => i.id == route.params.id)
    pageStore.setParams([data.name])
}
</script>

<template>
    <div>
        
    </div>
</template>