<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'

const state = reactive({
    menus: [
        { id: 'dashboard', link: '/', name: 'Dashboard', icon: 'home' },
        { id: 'accounts', link: '/accounts', name: 'Accounts', icon: 'staff' },
    ]
})
async function logout() {
    localStorage.removeItem('_token')
    useUserStore().resetUser() 
    await navigateTo('/login')
}
const labelStyle = `font-lg font-medium text-inherit text-white`
</script>

<template>
    <div class="h-full flex-col items-start justify-between pb-6">

        <div class="w-full md:flex md:flex-col md:items-start md:gap-4">
            <NuxtLink class="w-full" v-for="item in state.menus" :to="item.link" :key="item.id">
                <div id="row"
                    class="flex justify-start items-center gap-4 px-4 py-2 pl-8 hover:bg-primaryColor hover:text-white">
                    <IconSvg color="#fff" :key="item.id" :icon="item.icon" size="1em" />
                    <div :class="labelStyle">{{ item.name }}</div>
                </div>
            </NuxtLink>
        </div>
        <div @click="logout" id="logout" class="flex w-full justify-start items-center gap-4 px-4 py-2 pl-8 hover:bg-primaryColor hover:text-white cursor-pointer">
            <IconSvg color="#fff" icon="logout" size="1em" />
            <div :class="labelStyle">Logout</div>
        </div>
    </div>
</template>

<style scoped>
#row:hover :deep(path),
#row:hover :deep(g) {
    fill: #ffffff;
    stroke: #ffffff;
}
#logout:hover :deep(path) {
    stroke: #ffffff;
}
</style>
