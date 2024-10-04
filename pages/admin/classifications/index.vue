<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { classificationService } from '~/components/api/ClassificationService'

const pageTitle = 'Classifications'
const pageStore = usePageStore()
const classificationsData = ref([])
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
onBeforeUnmount(() => {
    pageStore.setParams([])
})
interface Classifications {
    id: number
    name: string,
    icon: string
    description: string
}
const sampleData: Array<Classifications> = [
    { id: 1, name: 'Beverages', icon: 'beverage', description: 'Lorem ipsum dolor sit amet' },
    { id: 2, name: 'Coffee', icon: 'coffee', description: 'Lorem ipsum dolor sit amet' },
    { id: 3, name: 'Sandwiches', icon: 'pizza', description: 'Lorem ipsum dolor sit amet' },
    { id: 4, name: 'Pasta', icon: 'meal', description: 'Lorem ipsum dolor sit amet' },
    { id: 5, name: 'Cake', icon: 'cake', description: 'Lorem ipsum dolor sit amet' },
]
onMounted(() => {
    fetch()
})

async function fetch() {
    try {
        const response = await classificationService.all()
        if (response.data) {
            classificationsData.value = response.data
            console.log(classificationsData.value)
        }
    } catch(error) {
        console.error(error)
    }
}
function onAddNew() {
    navigateTo('/admin/classifications/new')
}
function cardClickHandler(row: Classifications) {
    navigateTo('/admin/classifications/' + row.uuid)
}
</script>

<template>
    <div class="h-[calc(100vh-60px)] w-full flex flex-col items-center justify-start overflow-y-scroll">
        <div class="w-[90%] flex flex-col items-start">
            <PrimaryButton class="mb-6" label="New Classification" icon="plus" @click="onAddNew" />
            <div class="flex items-center justify-start flex-wrap gap-4">
                <CategoryCard v-for="item in classificationsData" :name="item.name" @click="cardClickHandler(item)" />
            </div>
        </div>
    </div>
</template>