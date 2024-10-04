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
    const getClassifications = computed(() => state.classifications)
    const getCurrent = computed(() => state.current)
    const getCurrentUUID = computed(() => state.current.uuid)
    const hasCurrent = computed(() => !!state.current)

    return { state, setClassifications, setCurrent, getClassifications, getCurrent, hasCurrent, getCurrentUUID }
}, { persist: true, })
