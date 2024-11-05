import { defineStore } from 'pinia';
import type { Admin, Cashier, Store, SuperAdmin } from '~/common/types';

interface UserState {
    user: SuperAdmin | Admin | Store | Cashier | null;
}

export const useUserStore = defineStore(
    'user',
    () => {
        const state: UserState = reactive({
            user: null,
        });

        function setUser(user: SuperAdmin | Admin | Store | Cashier) {
            state.user = user;
        }

        function resetUser() {
            state.user = null;
        }

        const getRole = computed(() =>
            state.user && state.user.role ? state.user.role : null,
        );
        const getUser = computed(() => state.user);

        return { state, setUser, resetUser, getRole, getUser };
    },
    { persist: true },
);
