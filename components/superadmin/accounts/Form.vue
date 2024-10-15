<script setup lang="ts">
import * as yup from 'yup';
import { adminService } from '~/api/superadmin/AdminService';
import type { Admin } from '~/common/types';

const props = defineProps<{
    editData?: Admin | null;
}>();

const loading = ref(false);

// validation
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        firstname: yup.string().required('Firstname field is required'),
        lastname: yup.string().required('Lastname field is required'),
        username: yup.string().required('Username field is required'),
        password: !props.editData
            ? yup.string().required('Password field is required')
            : yup.string(),
        is_active: yup.boolean(),
    }),
});
const [firstname] = defineField('firstname');
const [lastname] = defineField('lastname');
const [username] = defineField('username');
const [password] = defineField('password');
const [is_active] = defineField('is_active');

watch(
    () => props.editData,
    () => {
        firstname.value = props.editData?.firstname || '';
        lastname.value = props.editData?.lastname || '';
        username.value = props.editData?.username || '';
        is_active.value = props.editData ? props.editData.is_active : true;
    },
    { immediate: true },
);

const onFormSubmit = handleSubmit(async () => {
    try {
        loading.value = true;
        const params = {
            firstname: firstname.value,
            lastname: lastname.value,
            username: username.value,
            is_active: is_active.value,
        };

        // Optional password payload if editing
        if (props.editData) {
            if (password.value) {
                params.password = password.value;
            }
        } else {
            params.password = password.value;
        }

        let response;
        if (props.editData) {
            response = await adminService.update(params, props.editData?.uuid);
        } else {
            response = await adminService.create(params);
        }
        if (response.data) {
            navigateTo(`/superadmin/accounts`);
        }
    } catch (error: any) {
        console.error(error);
    }
    loading.value = false;
});
const getLoading = computed(() => loading.value);
const passwordLabel = computed(() =>
    !props.editData ? 'Password' : 'Update Password',
);
const passwordPlaceholder = computed(() =>
    !props.editData ? 'Enter Account Password' : 'Update Account Password',
);
const activeLabel = computed(() => (is_active.value ? 'Active' : 'Inactive'));
</script>

<template>
    <div
        class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6"
    >
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput
                class="my-3"
                name="firstname"
                placeholder="Enter Firstname"
                label="Firstname"
                v-model="firstname"
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                :error="errors.firstname"
            />
            <FormTextInput
                class="my-3"
                name="lastname"
                placeholder="Enter Lastname"
                label="Lastname"
                v-model="lastname"
                bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder"
                :error="errors.lastname"
            />
            <FormTextInput
                class="my-3"
                name="username"
                placeholder="Account Username"
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
                v-if="editData"
                class="my-3"
                :label="activeLabel"
                v-model="is_active"
            />

            <PrimaryButton
                type="submit"
                class="w-full my-3"
                :label="!editData ? 'Create Account' : 'Update Account'"
                :loading="getLoading"
            />
        </form>
    </div>
</template>
