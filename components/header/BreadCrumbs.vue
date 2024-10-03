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
    <div class="text text-primaryText font-medium flex items-center justify-start gap-2">
        <IconSvg v-if="breadCrumbs.length > 1" class="cursor-pointer" @click="onBackClick" icon="left" color="var(--text-primary)" size="1.5em" />
        <span v-for="(item, index) in breadCrumbs" :key="item">
            <NuxtLink class="hover:text-secondaryColor hover:underline" :to="getUrl(item, index)">{{ item }}</NuxtLink> {{  index < breadCrumbs.length - 1 ? ' / ' : ''  }}
        </span>
    </div>
</template>