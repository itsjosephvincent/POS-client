<script setup lang="ts">
import { authService } from '~/api/admin/AuthService';

navigateTo('/admin/login'); // redirect for now

definePageMeta({
    middleware: ['login'],
});
const userStore = useUserStore();
const hasError = ref(false);
const errorMessage = ref('');
const getHasError = computed(() => hasError.value);
const getErrorMessage = computed(() => errorMessage.value);
async function login(username: string, password: string) {
    hasError.value = false;
    try {
        interface loginParams {
            username: string;
            password: string;
        }
        let params: loginParams = {
            username,
            password,
        };
        const response = await authService.login(params);
        if (response.data) {
            localStorage.setItem('_token', response.data.token);
            response.data.user.role = 'Admin';
            userStore.setUser(response.data.user);
            await navigateTo('/admin/dashboard');
        }
    } catch (error: any) {
        console.log(error);
        hasError.value = true;
        errorMessage.value = error.getErrorMessage();
    }
}
</script>

<template>
    <div
        class="w-screen h-screen flex items-center justify-center bg-secondaryBg md:bg-primaryBg"
    >
        <LoginCard
            :login-handler="login"
            :has-error="getHasError"
            :error-message="getErrorMessage"
        />
    </div>
</template>
