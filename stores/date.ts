import { defineStore } from 'pinia';

interface DateState {
    date: Array<Date> | null;
}

export const useDateStore = defineStore(
    'category',
    () => {
        const state: DateState = reactive({
            date: null,
        });
        function setDate(date: Array<Date> | null) {
            state.date = date;
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
    { persist: true },
);
