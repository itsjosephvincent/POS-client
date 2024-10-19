import { defineStore } from 'pinia';

interface LoadingState {
    loading: boolean;
}
export const useLoadingStore = defineStore(
    'loading',
    () => {
        const state: LoadingState = reactive({
            loading: false,
        });

        function setLoading(value: boolean) {
            state.loading = value;
        }

        const getLoading = computed(() => state.loading);

        return {
            state,
            setLoading,
            getLoading,
        };
    },
    { persist: false },
);
