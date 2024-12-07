<script setup lang="ts">
import { productService } from '~/api/admin/ProductService';

const file = ref(null);
const fileInput = useTemplateRef('file-input');
const isLoading = ref(false);
const getFileUpload = computed(() => (!file.value ? false : file.value));
const errorMessage = ref(null);
function fileInputClick() {
    fileInput.value?.click();
}
function handleFileChange(event: any) {
    if (!event.target || !event.target.files || !event.target.files.length) {
        return console.error('error adding file');
    }
    file.value = event?.target?.files[0];
}
function removeFile(event: any) {
    if (!fileInput.value?.value) {
        return console.error('empty file value.');
    }
    event.stopPropagation();
    file.value = null;
    fileInput.value.value = '';
}
async function uploadFile() {
    if (!file.value) return;
    try {
        isLoading.value = true;
        const formData = new FormData();
        formData.append('file', file.value);
        const response = await productService.import(formData);
        isLoading.value = false;
        navigateTo('/admin/skus');
    } catch (error: any) {
        isLoading.value = false;
        errorMessage.value = error.getErrorMessage();
    }
}
</script>

<template>
    <div
        class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6"
    >
        <div
            @click="fileInputClick"
            class="w-full h-[200px] flex flex-col items-center justify-center border border-dashed border-tertiaryText rounded-xl"
        >
            <IconSvg icon="csv" color="secondaryText" size="40px" />
            <button
                v-if="!getFileUpload"
                class="p-2 text-secondaryText font-bold"
            >
                Browse Files (.xlsx, .xls, & .csv)
            </button>
            <div
                v-if="getFileUpload"
                class="p-2 text-secondaryColor font-bold flex items-center justify-center gap-2"
            >
                {{ getFileUpload.name }}
                <IconSvg
                    @click="removeFile"
                    icon="close"
                    color="secondaryText"
                    size="30px"
                    class="cursor-pointer p-1 rounded-full hover:bg-red-400/40"
                />
            </div>
            <input
                class="hidden"
                ref="file-input"
                type="file"
                name="file"
                size="10"
                @change="handleFileChange"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
        </div>
        <FormError v-if="errorMessage" :error="errorMessage" class="mt-2" />
        <PrimaryButton
            label="Import SKUs"
            :loading="isLoading"
            class="w-full h-[55px] mt-2 rounded-xl border border-primaryBorder bg-secondaryColor py-2 px-3 flex justify-center items-center gap-2 text-white"
            @click="uploadFile"
            :disabled="!file"
        />
    </div>
</template>
