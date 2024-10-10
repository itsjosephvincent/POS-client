<script setup lang="ts">
import { adminService } from '~/components/api/AdminService';

interface Account {
    firstname: string
    lastname: string
    username: string
}
const props = defineProps<{
    isEdit?: boolean
    editData?: Account
}>()
const userStore = useUserStore()
const role = userStore.getRole.toLowerCase()

const loading = ref(false)
const errorState = reactive({})

const firstnameModel = defineModel('firstname')
const lastnameModel = defineModel('lastname')
const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const confirmPasswordModel = defineModel('confirmPassword')
const isActiveModel = defineModel('isActive')

onMounted(() => {
    firstnameModel.value = props.editData?.firstname || ''
    lastnameModel.value = props.editData?.lastname || ''
    usernameModel.value = props.editData?.username || ''
    isActiveModel.value = props.editData ? props.editData.is_active : true
})

function validate() {
    if (!usernameModel.value) {
        errorState.username = "Username is required"
    }

    if (passwordModel.value !== confirmPasswordModel.value) {
        return console.error("Password doesn't match")
    }
}
async function onFormSubmit() {
    try {
        validate()
        loading.value = true
        const params = {
            firstname: firstnameModel.value,
            lastname: lastnameModel.value,
            username: usernameModel.value,
            is_active: isActiveModel.value
        }

        // Optional password payload if editing
        if (props.isEdit) {
            if (passwordModel.value) {
                params.password = passwordModel.value
            }
        } else {
            params.password = passwordModel.value
        }

        let response
        if (props.isEdit) {
            response = await adminService.update(params, props.editData?.uuid)
        } else {
            response = await adminService.create(params)
        }
        if (response.data) {
            navigateTo(`/superadmin/accounts`)
        }
    } catch (error: any) {
        console.log(error)

    }
    loading.value = false
}
const getLoading = computed(() => loading.value)
const passwordLabel = computed(() => !props.isEdit ? 'Password' : 'Update Password')
const passwordPlaceholder = computed(() => !props.isEdit ? 'Enter Account Password' : 'Update Account Password')
const activeLabel = computed(() => isActiveModel.value ? 'Active' : 'Inactive')

</script>

<template>
    <div class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl p-6">
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput class="my-3" name="store" placeholder="Enter Firstname" label="Firstname"
                :model-value="firstnameModel" @update:modelValue="$event => (firstnameModel = $event)" bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="store" placeholder="Enter Lastname" label="Lastname"
                :model-value="lastnameModel" @update:modelValue="$event => (lastnameModel = $event)" bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="username" placeholder="Account Username" label="Username"
                :model-value="usernameModel" @update:modelValue="$event => (usernameModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormPasswordInput name="password" :placeholder="passwordPlaceholder" :label="passwordLabel"
                :model-value="passwordModel" bg-class="bg-white"
                @update:modelValue="$event => (passwordModel = $event)" />
            <FormSwitch v-if="isEdit" class="my-3" :label="activeLabel" :model-value="isActiveModel" @update:modelValue="$event => (isActiveModel = $event)" />

            <PrimaryButton type="submit" class="w-full my-3" :label="!isEdit ? 'Create Account' : 'Update Account'"
                :loading="getLoading" />
        </form>
    </div>
</template>