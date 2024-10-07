import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
    const state = reactive({
        page: null,
        params: [],
        data: null
    })

    function setPage(page) {
        state.page = page
    }
    function setParams(params) {
        state.params = params
    }
    function setData(data) {
        state.data = data
    }
    function resetPageData() {
        state.page = null
        state.params = []
        state.data = null
    }

    const getPage = computed(() => state.page)
    const getParams = computed(() => state.params)
    const getPageData = computed(() => state.data)

    return { state, setPage, setParams, setData, getPage, resetPageData, getParams, getPageData }
}, { persist: false, })
