<script setup lang="ts">
import type { SidebarMenu } from '~/components/sidebar/types';

const sidebarMenus: Array<SidebarMenu> = [
    {
        id: 'dashboard',
        link: '/admin/dashboard',
        name: 'Dashboard',
        icon: 'home',
    },
    {
        id: 'reports',
        link: '/admin/reports',
        name: 'Reports',
        icon: 'reporting',
    },
    { id: 'stores', link: '/admin/stores', name: 'Stores', icon: 'warehouse' },
    { id: 'skus', link: '/admin/skus', name: 'SKUs', icon: 'products' },
    {
        id: 'categories',
        link: '/admin/categories',
        name: 'Categories',
        icon: 'categories',
    },
    { id: 'orders', link: '/admin/orders', name: 'Orders', icon: 'orders' },
];
</script>

<template>
    <div class="md:flex bg-primaryBg h-screen w-screen overflow-hidden">
        <SideBarComponent class="z-50" :menus="sidebarMenus" />
        <div
            class="h-full w-full bg-secondaryBg lg:bg-primaryBg flex flex-col justify-start"
        >
            <HeaderSuperAdmin />
            <div class="w-full h-[calc(100vh-60px)] overflow-y-auto">
                <slot />
            </div>
        </div>
    </div>
</template>
