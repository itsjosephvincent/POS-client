<script setup lang="ts">

const pageStore = usePageStore()

</script>

<template>
    <div class="w-full">
        <div class="flex h-[60px] w-full lg:px-4 z-10 bg-secondaryBg lg:bg-primaryBg items-center justify-between">
            <div class="md:block ml-[10px] lg:ml-0 px-6 font-bold text-lg text-primaryText">
                <HeaderBreadCrumbs />
            </div>
            <div class="flex gap-4 items-center">
                <HeaderCurrentUser />
            </div>
        </div>
    </div>
</template>
