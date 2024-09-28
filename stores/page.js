import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
    const state = reactive({
        page: null,
    })

    function setPage(page) {
        state.page = page
    }

    const getPage = computed(() => state.page)

    return { state, setPage, getPage }
}, { persist: false, })
