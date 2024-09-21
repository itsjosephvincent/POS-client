import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
    const selected = ref(null)
    const getSelected = computed(() => selected.value)

    function setSelected(category) {
        selected.value = category
    }

    return { selected, setSelected, getSelected }
}, { persist: true, })
