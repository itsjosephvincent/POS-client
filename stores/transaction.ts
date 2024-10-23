import { defineStore } from 'pinia';
import { TransactionMode, Table } from '~/common/types';

interface TransactionState {
    mode: TransactionMode | null;
}
export const useTransactionStore = defineStore(
    'transaction',
    () => {
        const state: TransactionState = reactive({
            mode: TransactionMode.RunningBill,
        });

        function setMode(mode: TransactionMode, table: Table | null = null) {
            state.mode = mode;
        }
        function reset() {
            state.mode = null;
        }

        const getMode = computed(() => state.mode);

        return {
            state,
            setMode,
            reset,
            getMode,
        };
    },
    { persist: false },
);
