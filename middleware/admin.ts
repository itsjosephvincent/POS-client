import { useUserStore } from '~/stores/user.js'

export default defineNuxtRouteMiddleware(async (from, to) => {
    // skip middleware on server
    if (import.meta.server) return

    const userStore = useUserStore()
    const user = userStore.getUser

    if (user.role !== 'Admin')
        return navigateTo(`/${user.role.toLowerCase()}/dashboard`)
    return 
})