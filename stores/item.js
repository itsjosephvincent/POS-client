import { defineStore } from "pinia"

export const useItemStore = defineStore('item', () => {
    const current = ref(null)
    const categoriesSelected = ref([])
    const getCurrent = computed(() => current.value)
    const getCategoriesSelected = computed(() => categoriesSelected.value)

    function setCurrent(item) {
        current.value = item
    }

    function addCategory(item) {
        categoriesSelected.value.push(item)
    }

    function removeCategory(item) {
        categoriesSelected.value = categoriesSelected.value.filter(i => i != item)
    }

    return { current, categoriesSelected, getCurrent, getCategoriesSelected, setCurrent, addCategory, removeCategory }
}, { persist: true, })
