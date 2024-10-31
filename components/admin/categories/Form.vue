<script setup lang="ts">
import { categoryService } from '~/api/admin/CategoryService';
import type { Category } from '~/common/types';

const props = defineProps<{
    isEdit?: boolean;
    editData?: Category;
}>();
const userStore = useUserStore();

const loading = ref(false);
const errorState = reactive({});

const nameModel = defineModel('name');

onMounted(() => {
    nameModel.value = props.editData?.name || '';
});

async function onFormSubmit() {
    try {
        loading.value = true;
        const params = {
            admin_id: userStore?.getUser?.id,
            name: nameModel.value,
        };
        let response;
        if (props.isEdit) {
            response = await categoryService.update(
                params,
                props.editData?.uuid,
            );
        } else {
            response = await categoryService.create(params);
        }
        if (response.data) {
            navigateTo(`/admin/categories`);
        }
    } catch (error: any) {
        console.error(error);
    }
    loading.value = false;
}
const getLoading = computed(() => loading.value);
</script>

<template>
    <div
        class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6"
    >
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput
                class="my-3"
                name="name"
                placeholder="Enter New Category"
                label="Category"
                :model-value="nameModel"
                @update:modelValue="($event) => (nameModel = $event)"
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                :error="errorState.username"
            />
            <PrimaryButton
                type="submit"
                class="w-full my-3"
                :label="!props.isEdit ? 'Create Category' : 'Update Category'"
                :loading="getLoading"
            />
        </form>
    </div>
</template>
