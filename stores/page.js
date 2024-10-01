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
    const getParamsString = computed(() => state.params.join(' / '))

    return { state, setPage, getPage, setParams, getParamsString }
}, { persist: false, })
