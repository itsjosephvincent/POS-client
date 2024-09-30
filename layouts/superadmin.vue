<script setup lang="ts">

</script>

<template>
    <div class="md:flex bg-primaryBg h-screen w-screen overflow-hidden">
        <SidebarSuperAdmin
            class="max-w-[240px] md:w-[240px] h-full border-r border-primaryBorder pt-24 hidden md:flex" />
        <div class="h-full w-full flex flex-col justify-start">
            <HeaderSuperAdmin />
            <slot />
        </div>
    </div>
</template>
