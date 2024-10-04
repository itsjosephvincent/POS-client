import { defineStore } from 'pinia'

export const useClassificationStore = defineStore('classification', () => {
    const state = reactive({
        current: null,
        classifications: [],
    })
    function setClassifications(classifications) {
        state.classifications = classifications
    }
    function setCurrent(classificationData) {
        state.current = classificationData
    }

    return { state, setClassifications, setCurrent, }
}, { persist: true, })
