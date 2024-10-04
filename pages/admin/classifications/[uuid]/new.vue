<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { classificationService } from '~/components/api/ClassificationService'
import { productService } from '~/components/api/ProductService'

const route = useRoute()
const pageTitle = 'Classifications'
const pageStore = usePageStore()
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    pageStore.setParams([...pageStore.getParams, 'Create New'])
    classificationFetch()
})
onBeforeUnmount(() => {

})
async function classificationFetch() {
    try {
        const response = await classificationService.find(route.params.uuid)
        if (response.data) {
            classificationData.value = response.data
            pageStore.setParams([response.data.name])
            pageStore.setData(response.data)
        }

    } catch (error) {
        console.error(error)
    }
}
const classificationData = ref({})
const imageUrl = ref(null)
const selectedFile = ref(null)
const productModel = defineModel('product')
const costModel = defineModel('cost')
const priceModel = defineModel('price')
const inventoryModel = defineModel('inventory')
function handleFileChange(event: object) {
    const file = event.target.files[0]
    if (file) {
        selectedFile.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
            imageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}
async function save() {
    try {
        const formData = new FormData()
        formData.append('category_id', classificationData.value.id)
        formData.append('category_uuid', classificationData.value.uuid)
        formData.append('name', productModel.value)
        formData.append('cost', costModel.value)
        formData.append('price', priceModel.value)
        formData.append('inventory', inventoryModel.value)
        if (imageUrl.value) {
            formData.append('image', selectedFile.value)
        }

        const response = await productService.create(formData)
        if (response.data) {
            console.log(response.data)
        }
    } catch(error) {
        console.error(error)
    }
}
</script>


<template>
    <div class="h-[calc(100vh-60px)] w-full max-w-[400px] overflow-y-scroll p-4 ml-6">
        <label for="file-upload" class="cursor-pointer w-40 h-40 rounded-xl">
            <div v-if="!imageUrl"
                class="w-40 h-40 rounded-xl border-2 border-dashed flex justify-center items-center border-gray-300 p-4 text-secondaryText text-center">
                Click to select an image
            </div>
            <img v-if="imageUrl" :src="imageUrl" alt="Preview"
                class="w-40 h-40 rounded-xl object-cover border border-primaryBorder" />
        </label>
        <input id="file-upload" type="file" accept="image/*" @change="handleFileChange" class="hidden" />

        <FormTextInput class="my-3" name="product" placeholder="Enter Product Name" label="Product"
            bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :model-value="productModel" @update:modelValue="$event => (productModel = $event)" />
        <FormTextInput class="my-3" type="number" name="cost" placeholder="Enter Cost of Goods" label="Cost of Goods"
            bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :model-value="costModel" @update:modelValue="$event => (costModel = $event)" />
        <FormTextInput class="my-3" type="number" name="price" placeholder="Enter Suggested Retail Price" label="SRP"
            bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :model-value="priceModel" @update:modelValue="$event => (priceModel = $event)" />
        <FormTextInput class="my-3" type="number" name="inventory" placeholder="Enter Current Inventory Count"
            label="Inventory Count" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :model-value="inventoryModel" @update:modelValue="$event => (inventoryModel = $event)" />
        <PrimaryButton @click="save" class="w-full my-3" label="Save" />
    </div>
</template>