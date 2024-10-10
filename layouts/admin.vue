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
        <div class="h-full w-full lg:px-0 bg-secondaryBg lg:bg-primaryBg flex flex-col justify-start">
            <HeaderSuperAdmin />
            <div class="h-[calc(100vh-60px)] w-full lg:w-full flex flex-col items-center lg:items-start justify-start  overflow-y-auto bg-secondaryBg lg:bg-primaryBg lg:p-4 lg:px-8">
                <slot />
            </div>
        </div>
    </div>
</template>
