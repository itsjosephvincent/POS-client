<script setup lang="ts">
import * as yup from 'yup';
import { tableService } from '~/api/store/TableService';
import type { Table } from '~/common/types';

const props = defineProps<{
    editData?: Table;
}>();
const userStore = useUserStore();

const loading = ref(false);

// validation
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Name field is required'),
    }),
});
const [name] = defineField('name');

onMounted(() => {
    resetForm();
    name.value = props.editData?.name || '';
});

async function onFormSubmit() {
    try {
        loading.value = true;
        const params = {
            name: name.value,
        };
        let response;
        if (props.editData) {
            response = await tableService.update(params, props.editData?.uuid);
        } else {
            response = await tableService.create(params);
        }
        if (response.data) {
            navigateTo(`/store/tables`);
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
                placeholder="Enter Table Name"
                label="Table"
                v-model="name"
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                :error="errors.name"
            />
            <PrimaryButton
                type="submit"
                class="w-full my-3"
                :label="!editData ? 'Create Table' : 'Update Table'"
                :loading="getLoading"
            />
        </form>
    </div>
</template>
