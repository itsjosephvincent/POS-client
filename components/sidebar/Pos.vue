<script setup lang="ts">
import { reactive, computed } from 'vue'
import { black } from '~/constants/colors';

const state = reactive({
    menus: [
        { id: 'register', link: '/cash-register', name: 'Cash Register', icon: 'cashRegister' },
        { id: 'orders', link: '/orders', name: 'Orders', icon: 'orders' },
        { id: 'transactions', link: '/transactions', name: 'Transactions', icon: 'transactions' },
        { id: 'cashDrawer', link: '/cash-drawer', name: 'Cash Drawer', icon: 'cashDrawer' },
        { id: 'staff', link: '/staff', name: 'Staff', icon: 'staff' },
        { id: 'items', link: '/items', name: 'Items', icon: 'items' },
        { id: 'inventory', link: '/inventory', name: 'Inventory', icon: 'inventory' },
        { id: 'reporting', link: '/reporting', name: 'Reporting', icon: 'reporting' },
        { id: 'settings', link: '/settings', name: 'Settings', icon: 'settings' },
    ]
})

const iconStyle = computed(() => "cursor-pointer hover:bg-slate-200 rounded-full p-2")

</script>

<template>
    <div class="md:flex md:flex-col md:items-center md:gap-4">
        <NuxtLink v-for="item in state.menus" :to="item.link">
            <IconSvg :color="black" :class="iconStyle" :icon="item.icon" />
        </NuxtLink>
    </div>
</template>
