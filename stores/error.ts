import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

interface ErrorState {
    errors: Array<ErrorMessage>;
}
interface ErrorMessage {
    id: null | string;
    errorMessage: string;
}
export const useErrorStore = defineStore('error', () => {
    const state: ErrorState = reactive({
        errors: [],
    });

    function newError(error: string) {
        state.errors = [...state.errors, { id: uuidv4(), errorMessage: error }];
    }
    function removeError(id: string) {
        state.errors = state.errors.filter((d) => d.id !== id);
    }
    function clearErrors() {
        state.errors = [];
    }

    const getErrors = computed(() => state.errors);

    return {
        state,
        newError,
        removeError,
        clearErrors,
        getErrors,
    };
});
