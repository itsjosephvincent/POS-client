<script setup lang="ts">
import { classificationService } from '~/components/api/ClassificationService'
import { productService } from '~/components/api/ProductService'
import * as yup from 'yup'

const route = useRoute()

const props = defineProps<{
    isEdit?: boolean
    editData?: object
}>()
const imageUrl = ref(null)
const selectedFile = ref(null)

const categories = ref([])
const errorMessage = ref(null)
const isLoading = ref(false)
const isFetching = ref(true)
const categoryId = ref(null)
const categoryUuid = ref(null)

// validation
const schema = yup.object({
    product: yup.string().required('Product is required'),
    classification: yup.string().required('Classification is required'),
    cost: yup.number().positive('Cost must be a positive number').required('Cost is required').typeError('Cost must be a number'),
    price: yup.number().positive('Price must be a positive number').required('Price is required').typeError('Price must be a number'),
    inventory: yup.number().positive('Inventory must be a positive number').required('Inventory is required').typeError('Inventory must be a number'),
})
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: schema,
})
const [product] = defineField('product')
const [classification] = defineField('classification')
const [cost] = defineField('cost')
const [price] = defineField('price')
const [inventory] = defineField('inventory')

onMounted(() => {
    resetForm()
    fetchCategories()
    setEditData()
})

function setEditData() {
    if (!props.isEdit) return
    product.value = props?.editData?.name || ''
    cost.value = props?.editData?.cost || ''
    price.value = props?.editData?.price || ''
    inventory.value = props?.editData?.inventory || ''
    imageUrl.value = props?.editData?.image || ''
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

const onSubmit = handleSubmit(async () => {
    try {
        errors.value = {}
        isLoading.value = true
        const formData = new FormData()
        if (!categoryId.value || !categoryUuid.value) {
            console.error('undefined selected category')
        }
        formData.append('category_id', categoryId.value)
        formData.append('category_uuid', classification.value)
        formData.append('name', product.value)
        formData.append('cost', cost.value)
        formData.append('price', price.value)
        formData.append('inventory', inventory.value)

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
    }
})

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
    <div class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6">
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
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" v-model="product"
                :error="errors.product" />
            <FormSelect :options="getCategorySelect" label="Classification" name="category"
                placeholder="Select Classification" v-model="classification" :error="errors.classification" :pre-selected-data="getSelectedProp" />
            <FormTextInput class="my-3" type="number" name="cost" placeholder="Enter Cost of Goods" label="Cost of Goods"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" v-model="cost"
                :error="errors.cost" />
            <FormTextInput class="my-3" type="number" name="price" placeholder="Enter Suggested Retail Price"
                label="SRP" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" v-model="price"
                :error="errors.price" />
            <FormTextInput class="my-3" type="number" name="inventory" placeholder="Enter Current Inventory Count"
                label="Inventory Count" bg-class="bg-secondaryBg" border-class="border border-primaryBorder"
                v-model="inventory" :error="errors.inventory" />
            <FormError v-if="errorMessage" :error="errorMessage" />
            <PrimaryButton :loading="isLoading" @click="onSubmit" class="w-full my-3"
                :label="!props.isEdit ? 'Save Product' : 'Update Product'"  />
        </div>
    </div>
</template>