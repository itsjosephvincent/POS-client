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

const isFetching = ref(false)
async function fetch() {
    try {
        isFetching.value = true
        const response = await classificationService.all()
        isFetching.value = false
        if (response.data) {
            classificationsData.value = response.data
            classificationStore.setClassifications(response.data)
            console.log(classificationsData.value)
        }
    } catch(error) {
        isFetching.value = false
        console.error(error)
    }
}
function onAddNew() {
    navigateTo('/admin/classifications/new')
}
function cardClickHandler(row: object) {
    // navigateTo('/admin/classifications/' + row.uuid)
}
</script>

<template>
    <div class="w-full px-6">
        <LoadingClassificationListSkeleton v-if="isFetching" />
        <div v-else class="w-full flex flex-col items-start">
            <PrimaryButton class="mb-6" label="New Classification" icon="plus" @click="onAddNew" />
            <div class="w-full flex items-center justify-start flex-wrap gap-4">
                <CategoryCard v-for="item in classificationsData" :classification-data="item" @fetch-classifications="fetch" />
            </div>
        </div>
    </div>
</template>