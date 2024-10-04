<script setup lang="ts">
import { usePageStore } from '~/stores/page';
import { productService } from '~/components/api/ProductService'

const pageTitle = 'SKUs'
const pageStore = usePageStore()
const file = ref(null)
const fileInput = useTemplateRef('file-input')
const isLoading = ref(false)
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    pageStore.setParams(['Import SKUs'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
const getFileUpload = computed(() => !file.value ? false : file.value)
function fileInputClick() {
    fileInput.value?.click()
}
function handleFileChange(event: object) {
    file.value = event.target.files[0]
    console.log(event.target.files[0])
}
function removeFile(event: object) {
    event.stopPropagation()
    file.value = null
    fileInput.value.value = ''
}
async function uploadFile() {
    if (!file.value) return
    try {
        isLoading.value = true
        const formData = new FormData()
        formData.append('file', file.value)
        const response = await productService.import(formData)
        console.log(response.data)
        isLoading.value = false
        alert('Successfully Imported')
    } catch(error) {
        isLoading.value = false
        console.error(error)
    }
}
</script>

<template>
    <div class="h-[calc(100vh-60px)] w-full flex justify-center overflow-y-scroll p-4">
        <div class="w-[90%] flex flex-col items-center justify-center">
            <div @click="fileInputClick" class="w-[600px] h-[200px] flex flex-col items-center justify-center  border border-dashed border-tertiaryText rounded-xl">
                <IconSvg icon="csv" color="var(--text-secondary)" size="3em" />
                    <button v-if="!getFileUpload" class="p-2 text-secondaryText">Browse Files</button>
                    <div v-if="getFileUpload" class="p-2 text-secondaryText flex items-center justify-center gap-2">
                        {{ getFileUpload.name }}
                        <IconSvg @click="removeFile" icon="close" size="1.3em" color="var(--text-secondary)" class="cursor-pointer p-1 rounded-full hover:bg-red-400/40" />
                    </div>
                    <input class="hidden" ref="file-input" type="file" name="file" size="10" @change="handleFileChange">

            </div>
            <PrimaryButton label="Import" :loading="isLoading" class="w-[600px] h-[55px] mt-4 rounded-xl border border-primaryBorder bg-secondaryColor py-2 px-3 flex justify-center items-center gap-2 text-white"
                @click="uploadFile" :disabled="!file"
            />
        </div>
    </div>
</template>