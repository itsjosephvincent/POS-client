<script setup lang="ts">
import { useUserStore } from '~/stores/user.js'
import { usePageStore } from '~/stores/page';

const pageStore = usePageStore()
const userStore = useUserStore()
const props = defineProps<{
    menus: Array<object>
}>()

const isOpen = ref(false)

async function logout() {
    const role = userStore.getRole
    localStorage.removeItem('_token')
    userStore.resetUser()
    await navigateTo(`/${role.toLowerCase()}/login`)
}
function toggleOpen() {
    isOpen.value = !isOpen.value
}
function linkCick() {
    isOpen.value = false
}
const labelStyle = `font-lg font-medium`
const rowStyle = `flex justify-start items-center gap-4 px-4 py-2 pl-4 cursor-pointer mx-4 my-2 rounded-xl text-primaryText hover:text-secondaryColor`
const currentPage = computed(() => pageStore.getPage)
const toggleIcon = computed(() => isOpen.value ? 'close' : 'hamburger')
const containerDisplayCss = computed(() => isOpen.value ? 'w-screen' : 'w-0')
</script>

<template>
    <div class="fixed lg:relative z-50">
        <button @click="toggleOpen" class="fixed lg:hidden top-[7px] ml-[8px] text-primaryText hover:text-secondaryColor hover:bg-secondaryColorTransparent rounded-full p-2">
            <IconSvg :icon="toggleIcon" color="current" />
        </button>
        <div :class="['overflow-hidden transition-all duration-500 bg-secondaryBg h-screen lg:w-[280px] lg:border-r lg:border-primaryBorder pt-24 flex flex-col items-start justify-between pb-6', containerDisplayCss]">
            <div class="w-full min-w-[200px] lg:flex lg:flex-col lg:items-start">
                <NuxtLink class="w-full" v-for="item in props.menus" :to="item.link" :key="item.id" @click="linkCick">
                    <div id="row" :class="[rowStyle, currentPage === item.name ? 'bg-secondaryColorTransparent' : '']">
                        <IconSvg :color="currentPage === item.name ? 'secondaryColor' : 'current'" :key="item.id"
                            :icon="item.icon" />
                        <div :class="[labelStyle, currentPage === item.name ? 'text-secondaryColor' : 'text-current']">
                            {{ item.name }}</div>
                    </div>
                </NuxtLink>
            </div>
            <div @click="logout" id="logout" :class="rowStyle">
                <IconSvg color="current" icon="logout" />
                <div :class="labelStyle">Logout</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
