import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const state = reactive({
        user: null,
    })

    function setUser(user) {
        state.user = user
    }

    function resetUser() {
        state.user = null
    }

    const getRole = computed(() => state.user && state.user.role ? state.user.role : null)

    return { state, setUser, resetUser, getRole }
}, { persist: true, })
