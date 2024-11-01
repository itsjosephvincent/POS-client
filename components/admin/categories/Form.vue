<script setup lang="ts">
import * as yup from 'yup';
import { categoryService } from '~/api/admin/CategoryService';
import type { Admin, Category } from '~/common/types';

const props = defineProps<{
    editData?: Category;
}>();
const userStore = useUserStore();

const loading = ref(false);

// validation
const schema = yup.object({
    name: yup.string().required('Category is required'),
});
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: schema,
});
const [name] = defineField('name');

onMounted(() => {
    resetForm();
    name.value = props.editData?.name || '';
});

const onFormSubmit = handleSubmit(async () => {
    try {
        const adminUser: any = userStore.getUser;
        if (!adminUser) throw 'No account';
        loading.value = true;
        const params = {
            admin_id: adminUser.id || null,
            name: name.value,
        };
        let response;
        if (props.editData) {
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
});

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
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                v-model="name"
                :error="errors.name"
            />
            <PrimaryButton
                type="submit"
                class="w-full my-3"
                :label="!editData ? 'Create Category' : 'Update Category'"
                :loading="getLoading"
            />
        </form>
    </div>
</template>
