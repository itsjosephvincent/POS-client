<script setup lang="ts">

const viewport = useViewport()
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
    pageStore.resetPageData()
    await navigateTo(`/${role.toLowerCase()}/login`)
}
function toggleOpen() {
    isOpen.value = !isOpen.value
}
function linkCick() {
    isOpen.value = false
}
const labelStyle = `font-lg font-medium`
const rowStyle = `flex justify-start items-center gap-4 px-4 py-2 pl-4 cursor-pointer mx-2 my-2 rounded-xl text-primaryText hover:text-secondaryColor`
const currentPage = computed(() => pageStore.getPage)
const toggleIcon = computed(() => isOpen.value ? 'close' : 'hamburger')
const containerDisplayCss = computed(() => isOpen.value ? 'w-screen' : 'w-0')
const getContainerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (isOpen.value) {
            return 'h-screen w-screen fixed top-0 left-0 bg-gray-700/70'
        } else {
            return 'h-screen w-0 fixed top-0 transition-all delay-600 left-0 bg-gray-700/70'
        }
    }
    return ''
})

</script>

<template>
    <div :class="[getContainerCss]">
        <div class="fixed lg:relative z-50 border-r-1 border-primaryBorder">
            <button @click="toggleOpen"
                class="fixed lg:hidden top-[11px] ml-[8px] text-primaryText hover:text-secondaryColor hover:bg-secondaryColorTransparent rounded-full p-2">
                <IconSvg :icon="toggleIcon" color="current" size="1.5em" />
            </button>
            <div
                :class="['overflow-hidden transition-all duration-500 bg-secondaryBg h-screen lg:w-[200px] xl:w-[280px] lg:border-r lg:border-primaryBorder flex flex-col items-start justify-between pb-6', containerDisplayCss]">
                <div class="w-full min-w-[200px] lg:flex lg:flex-col lg:justify-start lg:items-start">
                    <div class="font-lg text-xl text-primaryColor my-4 mx-14 lg:mx-4">Kahera POS</div>
                    <div class="h-10"></div>
                    <NuxtLink class="w-full" v-for="item in props.menus" :to="item.link" :key="item.id"
                        @click="linkCick">
                        <div id="row"
                            :class="[rowStyle, currentPage === item.name ? 'bg-secondaryColorTransparent' : '']">
                            <IconSvg :color="currentPage === item.name ? 'secondaryColor' : 'current'" :key="item.id"
                                :icon="item.icon" size="1em" />
                            <div
                                :class="[labelStyle, currentPage === item.name ? 'text-secondaryColor' : 'text-current']">
                                {{ item.name }}</div>
                        </div>
                    </NuxtLink>
                </div>
                <div @click="logout" id="logout" :class="rowStyle">
                    <IconSvg color="current" icon="logout" size="1em" />
                    <div :class="labelStyle">Logout</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
