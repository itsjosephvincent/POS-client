<script setup lang="ts">
const sidebarMenus = [
    { id: 'dashboard', link: '/admin/dashboard', name: 'Dashboard', icon: 'home' },
    { id: 'stores', link: '/admin/stores', name: 'Stores', icon: 'warehouse' },
]
</script>

<template>
    <div class="md:flex bg-primaryBg h-screen w-screen overflow-hidden">
        <SideBarComponent :menus="sidebarMenus"
            class="max-w-[280px] md:w-[280px] h-full border-r border-primaryBorder pt-24 hidden md:flex" />
        <div class="h-full w-full flex flex-col justify-start">
            <HeaderSuperAdmin />
            <slot />
        </div>
    </div>
</template>
