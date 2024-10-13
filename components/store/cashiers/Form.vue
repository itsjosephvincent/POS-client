<script setup lang="ts">
import * as yup from 'yup';
import { cashierService } from '~/api/store/CashierService';
import type { Cashier } from '~/common/types';

const props = defineProps<{
    isEdit?: boolean;
    editData?: Cashier;
}>();

const loading = ref(false);

// validation
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Name field is required'),
        username: yup.string().required('Username field is required'),
        password: !props.editData
            ? yup.string().required('Password field is required')
            : yup.string(),
        is_active: yup.boolean(),
    }),
});
const [name] = defineField('name');
const [username] = defineField('username');
const [password] = defineField('password');
const [is_active] = defineField('is_active');

onMounted(() => {
    resetForm();
    name.value = props.editData?.name || '';
    username.value = props.editData?.username || '';
    is_active.value = props.editData ? props.editData?.is_active : true;
});

const onSubmit = handleSubmit(async () => {
    try {
        loading.value = true;
        const params = {
            name: name.value,
            username: username.value,
            is_active: is_active.value,
        };

        // Optional password payload if editing
        if (props.isEdit) {
            if (password.value) {
                params.password = password.value;
            }
        } else {
            params.password = password.value;
        }

        let response;
        if (props.isEdit) {
            response = await cashierService.update(
                params,
                props.editData?.uuid || '',
            );
        } else {
            response = await cashierService.create(params);
        }
        loading.value = false;
        if (response.data) {
            navigateTo(`/store/cashiers`);
        }
    } catch (error: any) {
        loading.value = false;
        console.log(error);
    }
});

const getLoading = computed(() => loading.value);
const passwordLabel = computed(() =>
    !props.isEdit ? 'Password' : 'Update Password',
);
const passwordPlaceholder = computed(() =>
    !props.isEdit ? 'Enter Cashier Password' : 'Update Cashier Password',
);
const activeLabel = computed(() => (is_active.value ? 'Active' : 'Inactive'));
</script>

<template>
    <div
        class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6"
    >
        <form @submit.prevent="onSubmit" class="w-full">
            <FormTextInput
                class="my-3"
                name="store"
                placeholder="Enter Cashier Name"
                label="Cashier Name"
                v-model="name"
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                :error="errors.name"
            />
            <FormTextInput
                class="my-3"
                name="username"
                placeholder="Enter Cashier Username"
                label="Username"
                v-model="username"
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                :error="errors.username"
            />
            <FormPasswordInput
                name="password"
                :placeholder="passwordPlaceholder"
                :label="passwordLabel"
                v-model="password"
                bg-class="bg-white"
                :error="errors.password"
            />
            <FormSwitch
                v-if="isEdit"
                class="my-3"
                :label="activeLabel"
                v-model="is_active"
                :error="errors.is_active"
            />

            <PrimaryButton
                type="submit"
                class="w-full my-3"
                :label="!isEdit ? 'Create Cashier' : 'Update Cashier'"
                :loading="getLoading"
            />
        </form>
    </div>
</template>
