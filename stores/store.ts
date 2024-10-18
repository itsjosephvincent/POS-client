import { defineStore } from 'pinia';
import type { Store } from '~/common/types';

interface StoreState {
    store: Store | null;
}
export const useStoreStore = defineStore(
    'store',
    () => {
        const state: StoreState = reactive({
            store: null,
        });

        function setStore(store: Store) {
            state.store = store;
        }
        function reset() {
            state.store = null;
        }

        const getStore = computed(() => state.store);

        return { state, setStore, reset, getStore };
    },
    { persist: true },
);
