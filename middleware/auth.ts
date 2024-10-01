import { useUserStore } from '~/stores/user.js'
import { authService } from '~/components/api/AuthService.js'

export default defineNuxtRouteMiddleware(async (from, to) => {
    // skip middleware on server
    if (import.meta.server) return

    const token = localStorage.getItem('_token')
    const userStore = useUserStore()
    const state = userStore.state
    if (!token) {
        return navigateTo('/admin/login')
    }
    if (!state.user) {
        try {
            const response = await authService.user()
            if (response.data) {
                userStore.setUser(response.data)
                return
            }
            throw 'Invalid token.'
        } catch (error) {
            console.error(error)
            authService.revokeAccess()
            userStore.resetUser()
           return navigateTo('/admin/login') 
        }
    }
})
