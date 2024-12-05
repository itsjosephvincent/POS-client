import { defineStore } from 'pinia';

interface DateState {
    date: Array<Date> | null;
}

export const useDateStore = defineStore(
    'date',
    () => {
        const state: DateState = reactive({
            date: null,
        });
        function setDate(dates: Array<Date> | null) {
            state.date = dates;
        }
        function clear() {
            state.date = null;
        }
        const getDate = computed(() => state.date);

        return {
            state,
            setDate,
            getDate,
        };
    },
    { persist: false },
);
