<script setup lang="ts">
const pageStore = usePageStore()
const getTitle = computed(() => pageStore.getPage)

</script>

<template>
    <div class="w-full">
        <div class="flex h-[60px] w-full p-2 z-10 bg-primaryBg items-center justify-center md:justify-between">
            <div class="hidden md:block px-6 font-bold text-lg text-primaryText">{{ getTitle }}</div>
            <div class="flex gap-4 items-center">
                <HeaderCurrentUser />
            </div>
        </div>
    </div>
</template>
