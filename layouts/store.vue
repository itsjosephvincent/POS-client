<script setup lang="ts">
const sidebarMenus = [
    { id: 'dashboard', link: '/store/dashboard', name: 'Dashboard', icon: 'home' },
    { id: 'cashiers', link: '/store/cashiers', name: 'Cashiers', icon: 'staff' },
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
