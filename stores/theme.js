import { defineStore } from "pinia"

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false)

    function toggle() {
        isDark.value = !isDark.value
    }

    const theme = computed(() => isDark.value ? 'dark' : 'light')
    const isDarkTheme = computed(() => isDark.value)

    return { isDark, toggle, theme, isDarkTheme }

}, { persist: true, })