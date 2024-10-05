<script setup lang="ts">

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
const route = useRoute()
const pageStore = usePageStore()
const classificationStore = useClassificationStore()
const pageTitle = 'Classifications'
useHead({
    title: pageTitle,
})
onMounted(() => {
    initializePageData()
})
function initializePageData() {
    pageStore.setPage(pageTitle)
    let classifications = classificationStore.getClassifications
    let current = classifications.find((classification) => classification.uuid === route.params.uuid)
    if (!current) {
        return navigateTo('/admin/classifications')
    }
    classificationStore.setCurrent(current)
    pageStore.setParams([current.name])
}
const getCurrentCategoryUuid = computed(() => classificationStore.getCurrent?.uuid || '')

</script>

<template>
    <div class="h-[calc(100vh-60px)] w-[90%] flex flex-col items-center justify-start  overflow-y-scroll bg-secondaryBg lg:bg-primaryBg lg:p-4 lg:ml-6">
        <TableProducts :category-uuid="getCurrentCategoryUuid" />
    </div>
</template>