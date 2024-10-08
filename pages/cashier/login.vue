<script setup lang="ts">
import { authService } from '~/components/api/AuthService';
import { useUserStore } from '~/stores/user'

definePageMeta({
    middleware: ['login'],
})
const userStore = useUserStore()
const hasError = ref(false)
const errorMessage = ref('')
const getHasError = computed(() => hasError.value)
const getErrorMessage = computed(() => errorMessage.value)
async function login(username: string, password:string) {
    hasError.value = false
    try {
        interface loginParams {
            username: string;
            password: string;
        }
        let params: loginParams = {
            username,
            password,
        }
        const response = await authService.cashierLogin(params)
        if (response.data) {
            localStorage.setItem("_token", response.data.token)
            response.data.user.role = 'Cashier'
            userStore.setUser(response.data.user)
            await navigateTo('/cashier')
        }
    } catch (error: any) {
        console.log(error)
        hasError.value = true
        errorMessage.value = error.getErrorMessage()
    }
}

</script>

<template>
    <div class="w-screen h-screen flex items-center justify-center bg-secondaryBg md:bg-primaryBg">
        <LoginCard :login-handler="login" :has-error="getHasError" :error-message="getErrorMessage" button-label="Login as cashier" />
    </div>
</template>