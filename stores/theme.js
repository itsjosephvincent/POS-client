import { defineStore } from "pinia"

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false)

    function toggle() {
        isDark.value = !isDark.value
    }

    const theme = computed(() => isDark.value ? 'dark' : 'light')

    return { isDark, toggle, theme }

}, { persist: true, })