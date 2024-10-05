<script setup lang="ts">
import { productService } from '~/components/api/ProductService';

const route = useRoute()
const emit = defineEmits(['productFetch'])

const productData = ref({})
const isFetching = ref(false)

onMounted(() => {
    fetchProduct()
})

async function fetchProduct() {
    try {
        isFetching.value = true
        const product_uuid = route.params.uuid
        const response = await productService.product(product_uuid)
        isFetching.value = false
        if (response.data) {
            emit('productFetch', response.data)
            productData.value = response.data
        }
    } catch(error) {
        isFetching.value = false
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
    <div>
        <LoadingCardSkeleton v-if="isFetching" />
        <ProductCard v-else :uuid="getUUID" :name="getName" :cost="getCost" :price="getPrice"          :inventory="getInventory" :image="getImage" />
    </div>
</template>