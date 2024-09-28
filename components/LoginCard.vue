<script setup lang="ts">
import PasswordInput from './form/PasswordInput.vue';
import { authService } from '~/components/api/AuthService';
import { useUserStore } from '~/store/user.js'

const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const errorMessage = ref('')
const isLoading = ref(false)
async function login() {
    try {
        interface loginParams {
            username: string;
            password: string;
        }
        let params: loginParams = {
            username: usernameModel.value,
            password: passwordModel.value,
        }
        isLoading.value = true
        const response = await authService.login(params)
        if (response.data) {
            localStorage.setItem("_token", response.data.token)
            await navigateTo('/')
        }
    } catch (error: any) {
        console.log(error)
        errorMessage.value = error.getErrorMessage()
        isLoading.value = false
    }
}
const getError = computed(() => errorMessage.value)

</script>

<template>
    <div>
        <form
            class="w-screen max-w-[500px] h-[350px] bg-secondaryBg md:bg-secondaryBg md:rounded-xl md:border md:border-primaryBorder flex flex-col justify-center items-center gap-4"
            @submit.prevent="login">
            <div :class="`${!getError ? 'invisible' : ''} w-[calc(90%)] max-w-96 rounded-lg bg-red-100 p-3 text-errorColor flex items-center gap-4`">
                <IconSvg icon="error" color="var(--error-color)" /><span>{{ getError }}</span>
            </div>
            <FormTextInput name="username" icon="user" placeholder="Username" type="text" :modelValue="usernameModel"
                @update:modelValue="$event => (usernameModel = $event)" />
            <PasswordInput name="password" icon="password" post-icon="eyeClosed" placeholder="Password" type="password"
                :modelValue="passwordModel" @update:modelValue="$event => (passwordModel = $event)" />
            <FormButton type="submit" label="Login" :loading="isLoading" />
        </form>
    </div>
</template>
