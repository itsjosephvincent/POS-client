<script setup lang="ts">

const userStore = useUserStore()
const user = userStore.getUser

</script>

<template>
    <div class="flex justify-center">
        <div class="px-4 flex items-center gap-4">
            <button class="rounded-full p-2 hover:bg-secondaryColorTransparent hover:text-secondaryColor">
                <IconSvg icon="bell" size="1.5em" color="text-inherit" />
            </button>
            <div class="hidden md:flex flex-col justify-center items-start">
                <div class="text-xs text-secondaryText font-bold">Cashier Today!</div>
                <div class="text font-bold text-primaryText">{{ user.name }}</div>
            </div>
            <button class="rounded-full border border-primaryBorder">
                <img :alt="user.name" src="/img/user.svg" class="object-contain rounded-xl" height="50" width="50" />
            </button>
        </div>
    </div>

</template>