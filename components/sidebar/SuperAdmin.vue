<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'

const state = reactive({
    menus: [
        { id: 'dashboard', link: '/superadmin/dashboard', name: 'Dashboard', icon: 'home' },
        { id: 'accounts', link: '/superadmin/accounts', name: 'Accounts', icon: 'staff' },
    ]
})
async function logout() {
    localStorage.removeItem('_token')
    useUserStore().resetUser() 
    await navigateTo('/login')
}
const labelStyle = `font-lg font-medium text-inherit text-primaryText`
</script>

<template>
    <div class="bg-secondaryBg h-full flex-col items-start justify-between pb-6">

        <div class="w-full md:flex md:flex-col md:items-start">
            <NuxtLink class="w-full" v-for="item in state.menus" :to="item.link" :key="item.id">
                <div id="row"
                    class="flex justify-start items-center gap-4 px-4 py-2 pl-8">
                    <IconSvg color="var(--text-primary)" :key="item.id" :icon="item.icon" size="1em" />
                    <div :class="labelStyle">{{ item.name }}</div>
                </div>
            </NuxtLink>
        </div>
        <div @click="logout" id="logout" class="flex w-full justify-start items-center gap-4 px-4 py-2 pl-8 cursor-pointer">
            <IconSvg color="var(--text-primary)" icon="logout" size="1em" />
            <div :class="labelStyle">Logout</div>
        </div>
    </div>
</template>

<style scoped>

</style>
