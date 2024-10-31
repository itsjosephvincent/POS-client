import { defineStore } from 'pinia';

interface PageState {
    page: string | null;
    params: Array<string> | null;
    data: object | null;
}

export const usePageStore = defineStore(
    'page',
    () => {
        const state: PageState = reactive({
            page: null,
            params: [],
            data: null,
        });

        function setPage(page: string) {
            state.page = page;
        }
        function setParams(params: Array<string>) {
            state.params = params;
        }
        function setData(data: object) {
            state.data = data;
        }
        function resetPageData() {
            state.page = null;
            state.params = [];
            state.data = null;
        }

        const getPage = computed(() => state.page);
        const getParams = computed(() => state.params);
        const getPageData = computed(() => state.data);

        return {
            state,
            setPage,
            setParams,
            setData,
            getPage,
            resetPageData,
            getParams,
            getPageData,
        };
    },
    { persist: false },
);
