<script setup lang="ts">

const userStore = useUserStore()
const user = userStore.getUser

</script>

<template>
    <div class="flex justify-center">
        <div class="px-4 flex items-center gap-4">
            <img :alt="user.name" src="/img/user.svg" class="object-contain rounded-xl" height="50" width="50" />
            <div class="flex flex-col justify-center items-start">
                <div class="text-xs text-secondaryText font-bold">Cashier Today!</div>
                <div class="text font-bold text-primaryText">{{ user.name }}</div>
            </div>
            <IconSvg icon="bell" size="1.5em" />
        </div>
    </div>
    
</template>