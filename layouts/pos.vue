<script setup lang="ts">

</script>

<template>
    <div class="md:flex bg-gray-100 h-screen w-screen overflow-hidden">
            <SidebarPos class="bg-white max-w-[100px] md:w-[200px] h-full border-r border-slate-200 pt-12 hidden md:block" />
        <div class="h-full w-full">
            <HeaderPos />
            <slot />
        </div>
        <div class="w-[calc(60%)] max-w-[450px] xl:w-[45%] hidden lg:block">
            <BillingDrawer />
        </div>
    </div>
</template>
