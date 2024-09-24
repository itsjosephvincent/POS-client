<script setup lang="ts">
import PasswordInput from './form/PasswordInput.vue';


</script>

<template>
    <div class="w-screen max-w-[500px] h-96 md:bg-secondaryBg md:rounded-xl md:border md:border-primaryBorder flex flex-col justify-center items-center gap-4">
        <FormTextInput name="email" icon="user" placeholder="Email" type="text" />
        <PasswordInput name="password" icon="password" post-icon="eyeClosed" placeholder="Password" type="password" />
        <FormButton label="Login" />
    </div>
</template>