import { defineStore } from 'pinia'

export const useBillingStore = defineStore('billing', () => {
    const items = ref([])

    function addItem(item) {
        items.value.push(item)
    }

    const getItems = computed(() => {
        return items.value
    })

    return { items, addItem, getItems }
}, { persist: false, })