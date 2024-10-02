import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
    const state = reactive({
        page: null,
        params: [],
    })

    function setPage(page) {
        state.page = page
    }
    function setParams(params) {
        state.params = params
    }

    const getPage = computed(() => state.page)
    const getParams = computed(() => state.params)

    return { state, setPage, getPage, setParams, getParams }
}, { persist: false, })
