import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const state = reactive({
        user: null,
    })

    function setUser(user) {
        state.user = user
    }

    function resetUser() {
        state.user = null
    }

    const getRole = computed(() => state.user.role)

    return { state, setUser, resetUser, getRole }
})
