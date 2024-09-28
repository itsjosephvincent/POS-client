import { useUserStore } from "~/stores/user.js"

export default defineNuxtRouteMiddleware((from, to) => {
    // skip middleware on server
    if (import.meta.server) return

    const token = localStorage.getItem('_token')
    if (token) {
        return navigateTo('/')
    }
    useUserStore().resetUser()
    return
})
