import { useUserStore } from '~/stores/user.js'

export default defineNuxtRouteMiddleware(async (from, to) => {
    // skip middleware on server
    if (import.meta.server) return

    const userStore = useUserStore()
    const user = userStore.getUser
    const token = localStorage.getItem('_token')

    if (!user || !token) {
        userStore.resetUser()
        return navigateTo('/login')
    }
    if (userStore.getRole !== 'Cashier')
        return navigateTo(`/${userStore.getRole.toLowerCase()}/dashboard`)
    return 
})