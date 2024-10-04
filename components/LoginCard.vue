<script setup lang="ts">
import PasswordInput from './form/PasswordInput.vue';
import { authService } from '~/components/api/AuthService';
import { useUserStore } from '~/stores/user'

const props = defineProps<{
    loginHandler: Function;
    hasError?: boolean;
    errorMessage: string;
    buttonLabel?: string
}>()

const usernameModel = defineModel('username')
const passwordModel = defineModel('password')
const isLoading = ref(false)
const buttonLabel = computed(() => props.buttonLabel ? props.buttonLabel : 'Login')

async function onLogin() {
    isLoading.value = true
    await props.loginHandler(usernameModel.value, passwordModel.value)
    isLoading.value = false
}
const getHasError = computed(() => props.hasError)
const getError = computed(() => props.errorMessage)

</script>

<template>
    <div>
        <form
            class="w-screen max-w-[500px] h-[350px] bg-secondaryBg md:bg-secondaryBg md:rounded-xl md:border md:border-primaryBorder flex flex-col justify-center items-center gap-4 px-12"
            @submit.prevent="onLogin">
            <div :class="`${!getHasError ? 'invisible' : ''} w-[calc(90%)] max-w-96 rounded-lg bg-red-100 p-3 text-errorColor flex items-center gap-4`">
                <IconSvg icon="error" color="var(--error-color)" /><span>{{ getError }}</span>
            </div>
            <FormTextInput name="username" bg-class="bg-primaryBg" icon="user" placeholder="Username" type="text" :modelValue="usernameModel"
                @update:modelValue="$event => (usernameModel = $event)" />
            <PasswordInput name="password" icon="password" post-icon="eyeClosed" placeholder="Password" type="password"
                :modelValue="passwordModel" @update:modelValue="$event => (passwordModel = $event)" />
            <FormButton type="submit" :label="buttonLabel" :loading="isLoading" />
        </form>
    </div>
</template>
