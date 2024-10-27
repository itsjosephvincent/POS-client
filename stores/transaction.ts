import { defineStore } from 'pinia';
import { TransactionMode } from '~/common/types';

interface TransactionState {
    mode: TransactionMode | null;
    payment: boolean;
}
export const useTransactionStore = defineStore(
    'transaction',
    () => {
        const state: TransactionState = reactive({
            mode: TransactionMode.RunningBill,
            payment: false,
        });

        function setPayment(isPayment: boolean) {
            state.payment = isPayment;
        }
        function setMode(mode: TransactionMode) {
            state.mode = mode;
        }
        function reset() {
            state.mode = null;
        }

        const getMode = computed(() => state.mode);
        const isPayment = computed(() => state.payment);

        return {
            state,
            setPayment,
            setMode,
            reset,
            getMode,
            isPayment,
        };
    },
    { persist: true },
);
