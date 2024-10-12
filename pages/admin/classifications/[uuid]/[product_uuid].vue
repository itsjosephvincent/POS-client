<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { productService } from '~/components/api/ProductService';

const route = useRoute()
const pageTitle = 'Classifications'
const pageStore = usePageStore()
const classificationStore = useClassificationStore()
const productData = ref({})
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    initializePageData()
    fetchProduct()
    pageStore.setPage(pageTitle)
})
onBeforeUnmount(() => {

})
function initializePageData() {
    pageStore.setPage(pageTitle)
    const current = classificationStore.getCurrent
    if (!current) {
        return navigateTo('/admin/classifications')
    }
    classificationStore.setCurrent(current)
    pageStore.setParams([current.name, 'Products'])
}
async function fetchProduct() {
    try {
        if (!classificationStore.hasCurrent) {
            return navigateTo('/admin/classifications')
        }
        const product_uuid = route.params.product_uuid
        const params = {
            category_uuid: classificationStore.getCurrentUUID
        }
        const response = await productService.product(product_uuid, params)
        if (response.data) {
            console.log('PRODUCT', response.data)
            pageStore.setParams([classificationStore.getCurrent.name, response.data.name])
            productData.value = response.data
        }
    } catch(error) {
        console.error(error)
    }

}
const getName = computed(() => productData?.value?.name || '')
const getCost = computed(() => productData?.value?.cost || '0.00')
const getPrice = computed(() => productData?.value?.price || '0.00')
const getInventory = computed(() => productData?.value?.inventory || 0)
const getUUID = computed(() => productData?.value?.uuid || '')
const getImage = computed(() => productData?.value?.image || '')
</script>


<template>
    <div class="w-full px-6">
        <ProductCard :uuid="getUUID" :name="getName" :cost="getCost" :price="getPrice" :inventory="getInventory" :image="getImage" />
    </div>
</template>