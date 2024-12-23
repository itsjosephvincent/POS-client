import { useUserStore } from '~/stores/user.js';

export default defineNuxtRouteMiddleware((from, to) => {
    // skip middleware on server
    if (import.meta.server) return;

    const token = localStorage.getItem('_token');
    const userStore = useUserStore();
    if (token && userStore.getUser) {
        if (userStore.getRole === 'Cashier') {
            return navigateTo(`/${userStore.getRole.toLowerCase()}`);
        } else {
            return navigateTo(`/${userStore.getRole.toLowerCase()}/dashboard`);
        }
    }
    useUserStore().resetUser();
    return;
});
