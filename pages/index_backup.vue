<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <!-- <FormError :error="v$?.email?.$errors[0]?.$message.toString()" />
        <FormError :error="state?.error?.errors?.email?.[0]" /> -->
    </div>
</template>

<script setup lang="ts">
// import { authService } from '~/components/api/AuthService';
// import { useUserStore } from '@/stores/user'

// const userStore = useUserStore();

// const state = reactive({
//     email: '',
//     password: '',
//     error: ''
// })

// async function login()
// {
//     try{
//         let params = {
//             email: state.email,
//             password: state.password
//         }
//         const response = await authService.login(params)
//         if(response.data){
//             userStore.setUser(response.data.user)
//             localStorage.setItem("_token", response.data.token)
//         }
//     }catch(error)
//     {
//         state.error = error
//     }
// }
</script>