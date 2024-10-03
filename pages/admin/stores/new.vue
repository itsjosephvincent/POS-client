<script setup lang="ts">
import { storeService } from '~/components/api/StoreService';
import { usePageStore } from '~/stores/page';

const pageTitle = 'Stores'
const pageStore = usePageStore()
const userStore = useUserStore()
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    pageStore.setParams(['New Store'])
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})
const loading = ref(false)
const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const confirmPasswordModel = defineModel('confirmPassword')
const branchModel = defineModel('branch')
const storeModel = defineModel('store')
const getLoading = computed(() => loading.value)

async function onFormSubmit() {
    loading.value = true
    const params = {
        admin_id: userStore.getUser.id,
        store_name: storeModel.value,
        branch: branchModel.value,
        username: usernameModel.value,
        password: passwordModel.value,
    }

    if (passwordModel.value !== confirmPasswordModel.value) {
        return console.error("Password doesn't match")
    }

    try {
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

</script>

<template>
    <div class="h-[calc(100vh-60px)] w-full max-w-[400px] overflow-y-scroll p-4 ml-6">
        <form @submit.prevent="onFormSubmit">
            <FormTextInput class="my-3" name="store" placeholder="Enter Store Name" label="Store" :model-value="storeModel" @update:modelValue="$event => (storeModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="branch" placeholder="Enter Branch Name" label="Branch" :model-value="branchModel" @update:modelValue="$event => (branchModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="username" placeholder="Enter Store Account Username" label="Username" :model-value="usernameModel" @update:modelValue="$event => (usernameModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="password" placeholder="Enter Store Account Password" label="Password" :model-value="passwordModel" @update:modelValue="$event => (passwordModel = $event)"
                type="password" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <FormTextInput class="my-3" name="confirm-password" placeholder="Confirm Password" label="Confirm Password" :model-value="confirmPasswordModel" @update:modelValue="$event => (confirmPasswordModel = $event)"
                type="password" bg-class="bg-secondaryBg" border-class="border border-primaryBorder" />
            <PrimaryButton type="submit" class="w-full my-3" label="Create Store" :loading="getLoading" />
        </form>
    </div>
</template>