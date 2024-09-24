<script setup lang="ts">
import PasswordInput from './form/PasswordInput.vue';
import { authService } from '~/components/api/AuthService';

const state = reactive({
    email: '',
    password: '',
    error: ''
})

function inputChange(event: any) {
    console.log(event.target.value)
    state.email = event.target.value
}

function passwordChange(event: any) {
    console.log(event.target.value)
    state.password = event.target.value
}

async function login()
{
    try{
        let params = {
            email: state.email,
            password: state.password
        }
        const response = await authService.login(params)
        if(response.data){
            // userStore.setUser(response.data.user)
            localStorage.setItem("_token", response.data.token)
        }
    }catch(error)
    {
        // state.error = error
    }
}

</script>

<template>
    <div class="w-screen max-w-[500px] h-96 md:bg-secondaryBg md:rounded-xl md:border md:border-secondaryBorder flex flex-col justify-center items-center gap-4">
        <FormTextInput name="email" icon="user" placeholder="Email" type="text" @value-change="inputChange" />
        <PasswordInput name="password" icon="password" post-icon="eyeClosed" placeholder="Password" type="password" @value-change="passwordChange" />
        <FormButton @click="login" label="Login" />
    </div>
</template>