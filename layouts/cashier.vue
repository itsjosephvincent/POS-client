<script setup lang="ts">
const loadingStore = useLoadingStore();
</script>

<template>
    <div
        v-if="loadingStore.getLoading"
        class="layer w-screen h-screen fixed top-0 left-0 bg-slate-700/25 pointer-events-none flex justify-center items-center"
    >
        <IconSvg icon="loading" color="secondaryColor" size="8em" />
    </div>
    <div
        :class="[
            'md:flex bg-primaryBg h-screen w-screen overflow-hidden',
            loadingStore.getLoading ? 'pointer-events-none' : '',
        ]"
    >
        <div class="w-full">
            <CashierHeader />
            <slot />
        </div>
        <CashierBillingDrawer />
    </div>
</template>

<style scoped>
.layer {
    z-index: 9999;
    pointer-events: none;
}
</style>
