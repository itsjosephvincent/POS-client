<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { classificationService } from '~/components/api/ClassificationService'

const pageTitle = 'Classifications'
const classificationStore = useClassificationStore()
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
onMounted(() => {
    fetch()
})

async function fetch() {
    try {
        const response = await classificationService.all()
        if (response.data) {
            classificationsData.value = response.data
            classificationStore.setClassifications(response.data)
            console.log(classificationsData.value)
        }
    } catch(error) {
        console.error(error)
    }
}
function onAddNew() {
    navigateTo('/admin/classifications/new')
}
function cardClickHandler(row: object) {
    navigateTo('/admin/classifications/' + row.uuid)
}
</script>

<template>
    <div class="w-full">
        <div class="w-full flex flex-col items-start">
            <PrimaryButton class="mb-6" label="New Classification" icon="plus" @click="onAddNew" />
            <div class="flex items-center justify-start flex-wrap gap-4">
                <CategoryCard v-for="item in classificationsData" :name="item.name" @click="cardClickHandler(item)" />
            </div>
        </div>
    </div>
</template>