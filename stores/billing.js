import { defineStore } from 'pinia'

export const useBillingStore = defineStore('billing', () => {
    const state = reactive({
        items: [],
    })

    function addItem(item) {
        state.items.push(item)
    }
    function removeItem(uuid) {
        state.items = state.items.filter(item => item.uuid !== uuid)
    }

    const getItems = computed(() => state.items)
    const getTotal = computed(() => state.items.reduce((total, item) => total + item.price * item.quantity, 0))

    return { state, addItem, removeItem, getItems, getTotal }
}, { persist: true, })