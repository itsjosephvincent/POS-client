<script setup lang="ts">

</script>

<template>
    <div class="md:flex bg-primaryBg h-screen w-screen overflow-hidden">
        <div class="w-full">
            <PosHeader />
            <slot />
        </div>
        <PosBillingDrawer />
    </div>
</template>