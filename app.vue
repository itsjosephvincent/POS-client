<script setup lang="ts">
import { useThemeStore } from '~/stores/theme.js'

const store = useThemeStore()
const getTheme = computed(() => store.isDarkTheme ? 'dark' : '')

useHead({
    bodyAttrs: {
        class: getTheme,
    }
})

</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
