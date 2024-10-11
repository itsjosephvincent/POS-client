<script setup lang="ts">
const sidebarMenus = [
    { id: 'dashboard', link: '/admin/dashboard', name: 'Dashboard', icon: 'home' },
    { id: 'stores', link: '/admin/stores', name: 'Stores', icon: 'warehouse' },
    { id: 'skus', link: '/admin/skus', name: 'SKUs', icon: 'orders' },
    { id: 'classifications', link: '/admin/classifications', name: 'Classifications', icon: 'categories' },
]
</script>

<template>
    <div class="md:flex bg-primaryBg h-screen w-screen overflow-hidden">
        <SideBarComponent class="z-50" :menus="sidebarMenus" />
        <div class="h-full w-full bg-secondaryBg lg:bg-primaryBg flex flex-col justify-start">
            <HeaderSuperAdmin />
            <div class="w-full h-[calc(100vh-60px)] overflow-y-auto">
                <slot />
            </div>
            
        </div>
    </div>
</template>
