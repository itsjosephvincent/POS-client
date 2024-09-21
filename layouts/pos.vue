<script setup lang="ts">

</script>

<template>
    <div class="md:flex bg-gray-100 h-screen w-screen overflow-x-hidden">
        <div class="bg-white md:w-36 h-full border-r border-slate-200 pt-12 hidden md:block">
            <SidebarPos />
        </div>
        <div class="h-full w-full">
            <HeaderPos />
            <slot />
        </div>
        <div class="w-1/3">
            <BillingDrawer />
        </div>
    </div>
</template>
