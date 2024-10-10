<script setup lang="ts">
import { CashierService } from '~/components/api/CashierService';

interface Cashier {
    name: string
    username: string
}
const props = defineProps<{
    isEdit?: boolean
    editData?: Cashier
}>()
const userStore = useUserStore()
const role = userStore.getRole.toLowerCase()
const cashierService = new CashierService(role)

const loading = ref(false)
const errorState = reactive({})

const nameModel = defineModel('name')
const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const confirmPasswordModel = defineModel('confirmPassword')
const isActiveModel = defineModel('isActive')

onMounted(() => {
    nameModel.value = props.editData?.name || ''
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
            name: nameModel.value,
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
            response = await cashierService.update(params, props.editData?.uuid)
        } else {
            response = await cashierService.create(params)
        }
        if (response.data) {
            navigateTo(`/${role}/cashiers`)
        }
    } catch (error: any) {
        console.log(error)

    }
    loading.value = false
}
const getLoading = computed(() => loading.value)
const passwordLabel = computed(() => !props.isEdit ? 'Password' : 'Update Password')
const passwordPlaceholder = computed(() => !props.isEdit ? 'Enter Cashier Password' : 'Update Cashier Password')
const activeLabel = computed(() => isActiveModel.value ? 'Active' : 'Inactive')

</script>

<template>
    <div class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl p-6">
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput class="my-3" name="store" placeholder="Enter Cashier Name" label="Cashier Name"
                :model-value="nameModel" @update:modelValue="$event => (nameModel = $event)" bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="username" placeholder="Enter Cashier Username" label="Username"
                :model-value="usernameModel" @update:modelValue="$event => (usernameModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormPasswordInput name="password" :placeholder="passwordPlaceholder" :label="passwordLabel"
                :model-value="passwordModel" bg-class="bg-white"
                @update:modelValue="$event => (passwordModel = $event)" />
            <FormSwitch v-if="isEdit" class="my-3" :label="activeLabel" :model-value="isActiveModel" @update:modelValue="$event => (isActiveModel = $event)" />

            <PrimaryButton type="submit" class="w-full my-3" :label="!isEdit ? 'Create Cashier' : 'Update Cashier'"
                :loading="getLoading" />
        </form>
    </div>
</template>