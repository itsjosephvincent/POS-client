<script setup lang="ts">
import { storeService } from '~/components/api/StoreService';

interface StoreData {
    store_name: string
    branch: string
    username: string
}
const props = defineProps<{
    isEdit?: boolean
    editData?: StoreData
}>()

const loading = ref(false)
const errorState = reactive({})

const storeModel = defineModel('store')
const branchModel = defineModel('branch')
const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const confirmPasswordModel = defineModel('confirmPassword')

onMounted(() => {
    storeModel.value = props.editData?.store_name || ''
    branchModel.value = props.editData?.branch || ''
    usernameModel.value = props.editData?.username || ''
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
            admin_id: userStore.getUser.id,
            store_name: storeModel.value,
            branch: branchModel.value,
            username: usernameModel.value,
            password: passwordModel.value,
        }
        const response = await storeService.create(params)
        if (response.data) {
            console.log("saved store: ", response.data)
            navigateTo(`/admin/stores/${response.data.uuid}`)
        }
    } catch (error: any) {
        console.log(error)

    }
    loading.value = false
}
const getLoading = computed(() => loading.value)

</script>

<template>
    <div class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl p-6">
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput class="my-3" name="store" placeholder="Enter Store Name" label="Store" :model-value="storeModel" @update:modelValue="$event => (storeModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :error="errorState.username"/>
            <FormTextInput class="my-3" name="branch" placeholder="Enter Branch Name" label="Branch" :model-value="branchModel" @update:modelValue="$event => (branchModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="username" placeholder="Enter Store Account Username" label="Username" :model-value="usernameModel" @update:modelValue="$event => (usernameModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput v-if="!props.isEdit" class="my-3" name="password" placeholder="Enter Store Account Password" label="Password" :model-value="passwordModel" @update:modelValue="$event => (passwordModel = $event)"
                type="password" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput v-if="!props.isEdit" class="my-3" name="confirm-password" placeholder="Confirm Password" label="Confirm Password" :model-value="confirmPasswordModel" @update:modelValue="$event => (confirmPasswordModel = $event)"
                type="password" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <PrimaryButton type="submit" class="w-full my-3" :label="!props.isEdit ? 'Create Store' : 'Update Store'" :loading="getLoading" />
        </form>
    </div>
</template>