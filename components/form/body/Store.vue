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
const userStore = useUserStore()

const loading = ref(false)
const errorState = reactive({})

const storeModel = defineModel('store')
const branchModel = defineModel('branch')
const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const isActiveModel = defineModel('isActive')

onMounted(() => {
    storeModel.value = props.editData?.store_name || ''
    branchModel.value = props.editData?.branch || ''
    usernameModel.value = props.editData?.username || ''
    isActiveModel.value = props.editData ? props.editData.is_active : true
})

function validate() {
    if (!usernameModel.value) {
        errorState.username = "Username is required"
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
            response = await storeService.update(params, props.editData?.uuid)
        } else {
            response = await storeService.create(params)
        }
        if (response.data) {
            navigateTo(`/admin/stores`)
        }
    } catch (error: any) {
        console.log(error)

    }
    loading.value = false
}
const getLoading = computed(() => loading.value)
const passwordLabel = computed(() => !props.isEdit ? 'Password' : 'Update Password')
const passwordPlaceholder = computed(() => !props.isEdit ? 'Enter Store Password' : 'Update Store Password')
const activeLabel = computed(() => isActiveModel.value ? 'Active' : 'Inactive')

</script>

<template>
    <div class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6">
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput class="my-3" name="store" placeholder="Enter Store Name" label="Store" :model-value="storeModel" @update:modelValue="$event => (storeModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :error="errorState.username"/>
            <FormTextInput class="my-3" name="branch" placeholder="Enter Branch Name" label="Branch" :model-value="branchModel" @update:modelValue="$event => (branchModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="username" placeholder="Enter Store Account Username" label="Username" :model-value="usernameModel" @update:modelValue="$event => (usernameModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
                <FormPasswordInput name="password" :placeholder="passwordPlaceholder" :label="passwordLabel"
                :model-value="passwordModel" bg-class="bg-white"
                @update:modelValue="$event => (passwordModel = $event)" />
            <FormSwitch v-if="isEdit" class="my-3" :label="activeLabel" :model-value="isActiveModel" @update:modelValue="$event => (isActiveModel = $event)" />

            <PrimaryButton type="submit" class="w-full my-3" :label="!props.isEdit ? 'Create Store' : 'Update Store'" :loading="getLoading" />
        </form>
    </div>
</template>