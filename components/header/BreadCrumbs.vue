<script setup lang="ts">

const route = useRoute()
const pageStore = usePageStore()
const path = computed(() => route.path.split('/').splice(1))
const breadCrumbs = computed(() => {
    return [pageStore.getPage, ...pageStore.getParams]
})
function getUrl(item, index) {
    const diff = ([pageStore.getPage, ...pageStore.getParams].length - 1) - index
    const url = route.path.split('/')
    if (diff) url.splice(diff * -1)
    return url.join('/')
}
function onBackClick() {
    const router = useRouter()
    router.back()
}

</script>

<template>
    <div class="flex items-center justify-start gap-2 ml-4 lg:ml-0 select-none text text-primaryText font-medium ">
        <IconSvg class="cursor-pointer" @click="onBackClick" icon="left" color="primaryText" custom-class="hover:text-secondaryColor" />
        <span class="text-xs lg:text-lg" v-for="(item, index) in breadCrumbs" :key="item">
            <NuxtLink class="hover:text-secondaryColor hover:underline" :to="getUrl(item, index)">{{ item }}</NuxtLink> {{  index < breadCrumbs.length - 1 ? ' / ' : ''  }}
        </span>
    </div>
</template>