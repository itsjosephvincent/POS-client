<script setup lang="ts">
import { classificationService } from '~/components/api/ClassificationService'
import { productService } from '~/components/api/ProductService'

const route = useRoute()

const props = defineProps<{
    isEdit?: boolean
    editData?: object
}>()
const imageUrl = ref(null)
const selectedFile = ref(null)
const errors = ref({})
const categories = ref([])
const errorMessage = ref(null)
const isLoading = ref(false)
const isFetching = ref(true)

const productModel = defineModel('product')
const classificationModel = defineModel('classification')
const costModel = defineModel('cost')
const priceModel = defineModel('price')
const inventoryModel = defineModel('inventory')
const categoryId = ref(null)
const categoryUuid = ref(null)

onMounted(() => {
    fetchCategories()
    setEditData()
})

function setEditData() {
    if (!props.isEdit) return
    productModel.value = props.editData?.name || ''
    costModel.value = props.editData?.cost || ''
    priceModel.value = props.editData?.price || ''
    inventoryModel.value = props.editData?.inventory || ''
    imageUrl.value = props.editData.image || ''
}
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
function onClassificationSelect(value: string) {
    const selectedCategory = categories.value.find(d => value === d.uuid)
    if (selectedCategory) {
        categoryId.value = selectedCategory.id
        categoryUuid.value = selectedCategory.uuid
    }
}
async function fetchCategories() {
    try {
        isFetching.value = true
        const response = await classificationService.all()
        if (response.data) {
            categories.value = response.data
            isFetching.value = false
        }
    } catch (error) {
        console.error(error)
        isFetching.value = false
    }
}
async function handleSubmit() {
    try {
        errors.value = {}
        isLoading.value = true
        const formData = new FormData()
        if (!categoryId.value || !categoryUuid.value) {
            console.error('undefined selected category')
        }
        formData.append('category_id', categoryId.value)
        formData.append('category_uuid', categoryUuid.value)
        formData.append('name', productModel.value)
        formData.append('cost', costModel.value)
        formData.append('price', priceModel.value)
        formData.append('inventory', inventoryModel.value)
        
        if (selectedFile.value) {
            formData.append('image', selectedFile.value)
        }
        let response
        if (props.isEdit && route.params.uuid) {
            response = await productService.update(formData, route.params.uuid)
        } else {
            response = await productService.create(formData)
        }
        isLoading.value = false
        if (response.data) {
            navigateTo('/admin/skus')
        }
    } catch (error: any) {
        console.error(error)
        isLoading.value = false
        errorMessage.value = error.getErrorMessage()
        errors.value = error.errors
    }
}

const getNameError = computed(() => errors.value?.name?.[0] || '')
const getCostError = computed(() => errors.value?.cost?.[0] || '')
const getPriceError = computed(() => errors.value?.price?.[0] || '')
const getInventoryError = computed(() => errors.value?.inventory?.[0] || '')
const getCategorySelect = computed(() => categories.value.map(d => ({
        key: d.uuid,
        value: d.uuid,
        label: d.name,
    })
))
const getSelectedProp = computed(() => {
    if (!props.editData) return null
    return {
        key: props.editData.category?.uuid,
        value: props.editData.category?.uuid,
        label: props.editData.category?.name,
    }
})
</script>

<template>
    <div class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6">
        <LoadingProductSkeleton v-if="isFetching" />
        <div v-else class="w-full">
            <label for="file-upload" class="block cursor-pointer w-40 h-40 rounded-xl">
                <div v-if="!imageUrl"
                    class="w-40 h-40 rounded-xl border-2 border-dashed flex justify-center items-center border-gray-300 p-4 text-secondaryText text-center">
                    Click to select an image
                </div>
                <img v-if="imageUrl" :src="imageUrl" alt="Preview"
                    class="w-40 h-40 rounded-xl object-cover border border-primaryBorder" />
            </label>
            <input id="file-upload" type="file" accept="image/*" @change="handleFileChange" class="hidden" />

            <FormTextInput class="my-3" name="name" placeholder="Enter Product Name" label="Product"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :model-value="productModel"
                @update:modelValue="$event => (productModel = $event)" :error="getNameError" />
            <FormSelect :options="getCategorySelect" label="Classification" name="category"
                placeholder="Select Classification" :model-value="classificationModel"
                @update:modelValue="$event => (classificationModel = $event)"
                @select-classification="onClassificationSelect"
                :pre-selected-data="getSelectedProp" />
            <FormTextInput class="my-3" type="number" name="cost" placeholder="Enter Cost of Goods"
                label="Cost of Goods" bg-class="bg-secondaryBg" border-class="border border-primaryBorder"
                :model-value="costModel" @update:modelValue="$event => (costModel = $event)" :error="getCostError" />
            <FormTextInput class="my-3" type="number" name="price" placeholder="Enter Suggested Retail Price"
                label="SRP" bg-class="bg-secondaryBg" border-class="border border-primaryBorder"
                :model-value="priceModel" @update:modelValue="$event => (priceModel = $event)" :error="getPriceError" />
            <FormTextInput class="my-3" type="number" name="inventory" placeholder="Enter Current Inventory Count"
                label="Inventory Count" bg-class="bg-secondaryBg" border-class="border border-primaryBorder"
                :model-value="inventoryModel" @update:modelValue="$event => (inventoryModel = $event)"
                :error="getInventoryError" />
            <FormError v-if="errorMessage" :error="errorMessage" />
            <PrimaryButton :loading="isLoading" @click="handleSubmit" class="w-full my-3" :label="!props.isEdit ? 'Save Product' : 'Update Product'" />
        </div>
    </div>
</template>