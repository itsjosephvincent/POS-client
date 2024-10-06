<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'
import { usePageStore } from '~/stores/page';

const pageStore = usePageStore()
const userStore = useUserStore()
const props = defineProps<{
    menus: Array<object>
}>()
async function logout() {
    const role = userStore.getRole
    localStorage.removeItem('_token')
    userStore.resetUser() 
    await navigateTo(`/${role.toLowerCase()}/login`)
}
const labelStyle = `font-lg font-medium`
const rowStyle = `flex justify-start items-center gap-4 px-4 py-2 pl-4 cursor-pointer mx-4 my-2 rounded-xl text-primaryText hover:text-secondaryColor`
const currentPage = computed(() => pageStore.getPage)
</script>

<template>
    <div class="bg-secondaryBg h-full flex-col items-start justify-between pb-6">
        <div class="w-full md:flex md:flex-col md:items-start">
            <NuxtLink class="w-full" v-for="item in props.menus" :to="item.link" :key="item.id">
                <div id="row" :class="[rowStyle, currentPage === item.name ? 'bg-secondaryColorTransparent' : '']">
                    <IconSvg :color="currentPage === item.name ? 'secondaryColor' : 'current'" :key="item.id" :icon="item.icon" />
                    <div :class="[labelStyle, currentPage === item.name ? 'text-secondaryColor' : 'text-current']">{{ item.name }}</div>
                </div>
            </NuxtLink>
        </div>
        <div @click="logout" id="logout" :class="rowStyle">
            <IconSvg color="current" icon="logout" />
            <div :class="labelStyle">Logout</div>
        </div>
    </div>
</template>

<style scoped>

</style>
