<script setup lang="ts">

</script>

<template>
    <div class="md:flex bg-primaryBg h-screen w-screen overflow-hidden">
        <SidebarSuperAdmin
            class="bg-secondaryBg max-w-[300px] md:w-[300px] h-full border-r border-primaryBorder pt-24 hidden md:flex" />
        <div class="h-full w-full">
            <HeaderSuperAdmin />
            <slot />
        </div>
    </div>
</template>
