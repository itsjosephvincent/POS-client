import { defineStore } from 'pinia';
import { DrawerPage } from '~/common/types';

interface DrawerPageState {
    page: DrawerPage;
}
export const useDrawerPageStore = defineStore('drawer-page', () => {
    const state: DrawerPageState = reactive({
        page: DrawerPage.Orders,
    });

    function setPage(page: DrawerPage) {
        state.page = page;
    }

    const getPage = computed(() => state.page);

    return {
        state,
        setPage,
        getPage,
    };
});
