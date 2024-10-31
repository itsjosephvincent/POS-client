import { defineStore } from 'pinia';
import type { Category } from '~/common/types';

interface CategoryState {
    current: Category | null;
    categories: Array<Category>;
}

export const useCategoryStore = defineStore(
    'category',
    () => {
        const state: CategoryState = reactive({
            current: null,
            categories: [],
        });
        function setCategories(categories: Array<Category>) {
            state.categories = categories;
        }
        function setCurrent(category: Category) {
            state.current = category;
        }
        const getCategories = computed(() => state.categories);
        const getCurrent = computed(() => state.current);
        const getCurrentUUID = computed(() => state.current?.uuid || null);
        const hasCurrent = computed(() => !!state.current);

        return {
            state,
            setCategories,
            setCurrent,
            getCategories,
            getCurrent,
            hasCurrent,
            getCurrentUUID,
        };
    },
    { persist: true },
);
