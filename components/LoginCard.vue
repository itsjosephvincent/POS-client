<script setup lang="ts">
import PasswordInput from './form/PasswordInput.vue';
import { authService } from '~/components/api/AuthService';
import { useUserStore } from '~/store/user.js'

const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const error = ref('')
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
        const response = await authService.login(params)
        if (response.data) {
            localStorage.setItem("_token", response.data.token)
            await navigateTo('/')
        }
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div>
        <form class="w-screen max-w-[500px] h-96 md:bg-secondaryBg md:rounded-xl md:border md:border-secondaryBorder flex flex-col justify-center items-center gap-4" @submit.prevent="login">
            <FormTextInput name="username" icon="user" placeholder="Username" type="text" :modelValue="usernameModel"
                @update:modelValue="$event => (usernameModel = $event)" />
            <PasswordInput name="password" icon="password" post-icon="eyeClosed" placeholder="Password" type="password"
                :modelValue="passwordModel" @update:modelValue="$event => (passwordModel = $event)" />
            <FormButton type="submit" label="Login" />
        </form>
    </div>
</template>
