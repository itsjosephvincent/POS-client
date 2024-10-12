<script setup lang="ts">
import { usePageStore } from '~/stores/page';

const route = useRoute()
const pageTitle = 'Classifications'
const pageStore = usePageStore()
const classificationStore = useClassificationStore()
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    initializePageData()
    pageStore.setPage(pageTitle)
})
onBeforeUnmount(() => {

})
function initializePageData() {
    pageStore.setPage(pageTitle)
    let classifications = classificationStore.getClassifications
    let current = classifications.find((classification) => classification.uuid === route.params.uuid)
    if (!current) {
        return navigateTo('/admin/classifications')
    }
    classificationStore.setCurrent(current)
    pageStore.setParams([current.name, 'Create New'])
}
const getClassificationId = computed(() => classificationStore?.state?.current?.id || 0)
const getClassificationUuId = computed(() => classificationStore?.state?.current?.id || '')
</script>


<template>
    <div class="w-full px-6">
        <FormBodyProduct :category_id="getClassificationId" :category_uuid="getClassificationUuId" />
    </div>
</template>