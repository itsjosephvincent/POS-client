<script setup lang="ts">
import { StoreService } from '~/components/api/StoreService'
import * as yup from 'yup'

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
const role = userStore.getRole.toLowerCase()

const loading = ref(false)

// validation
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        store: yup.string().required('Store field is required'),
        branch: yup.string().required('Branch field is required'),
        username: yup.string().required('Username field is required'),
        is_active: yup.boolean(),
        password: !props.editData ? yup.string().required('Password field is required') : yup.string(),
    }),
})
const [store] = defineField('store')
const [branch] = defineField('branch')
const [username] = defineField('username')
const [is_active] = defineField('is_active')
const [password] = defineField('password')

onMounted(() => {
    resetForm()
    store.value = props.editData?.store_name || ''
    branch.value = props.editData?.branch || ''
    username.value = props.editData?.username || ''
    is_active.value = props.editData ? props.editData.is_active : true
})

const onFormSubmit = handleSubmit(async () => {
    try {
        loading.value = true
        const params = {
            admin_id: userStore.getUser.id,
            store_name: store.value,
            branch: branch.value,
            username: username.value,
            is_active: is_active.value
        }

        // Optional password payload if editing
        if (props.isEdit) {
            if (password.value) {
                params.password = password.value
            }
        } else {
            params.password = password.value
        }

        let response
        const storeService = new StoreService(role)
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
})
const getLoading = computed(() => loading.value)
const passwordLabel = computed(() => !props.isEdit ? 'Password' : 'Update Password')
const passwordPlaceholder = computed(() => !props.isEdit ? 'Enter Store Password' : 'Update Store Password')
const activeLabel = computed(() => is_active.value ? 'Active' : 'Inactive')

</script>

<template>
    <div class="w-full max-w-lg my-6 bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6">
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput class="my-3" name="store" placeholder="Enter Store Name" label="Store" v-model="store" bg-class="bg-secondaryBg"
                border-class="border border-primaryBorder" :error="errors.store" />
            <FormTextInput class="my-3" name="branch" placeholder="Enter Branch Name" label="Branch"
                v-model="branch" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :error="errors.branch" />
            <FormTextInput class="my-3" name="username" placeholder="Enter Store Account Username" label="Username"
                v-model="username"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :error="errors.username" />
            <FormPasswordInput name="password" :placeholder="passwordPlaceholder" :label="passwordLabel"
                v-model="password" bg-class="bg-white" :error="errors.password"  />
            <FormSwitch v-if="isEdit" class="my-3" :label="activeLabel" v-model="is_active" />

            <PrimaryButton type="submit" class="w-full my-3" :label="!props.isEdit ? 'Create Store' : 'Update Store'"
                :loading="getLoading" />
        </form>
    </div>
</template>