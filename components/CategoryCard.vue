<script setup lang="ts">

const props = defineProps<{
    name: string
    icon?: string
    description?: string
}>()

</script>

<template>
    <div :class="['w-40 h-40 p-4 bg-secondaryBg border border-primaryBorder rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer text-primaryColor hover:text-secondaryColor hover:bg-secondaryColorTransparent']">
        <IconSvg v-if="props.icon" :icon="props.icon" size="2em" />
        <div class="font-bold  select-none">{{ name }}</div>
        <div v-if="props.description" class="mt-2 text-sm">{{ props.description }}</div>
    </div>
</template>
