<script setup lang="ts">
import { useThemeStore } from '~/stores/theme.js';

definePageMeta({
    middleware: ['login'],
})

</script>

<template>
    <div class="w-screen h-screen flex items-center justify-center bg-secondaryBg md:bg-primaryBg">
        <LoginCard />
    </div>
</template>
