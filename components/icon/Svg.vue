<script setup lang="ts">
import icons from '~/constants/icons.js'

const props = defineProps<{
    icon: string
    color?: string
    bgColor?: string
    size?: string
    customClass?: string
}>()

const getSize = computed(() => props.size ? props.size : '1em')
const bgClass = computed(() => props.bgColor ? 'bg-' + props.bgColor : '')
const iconColor = computed(() => props.color ? 'text-' + props.color : 'text-primaryText')
const customClass = computed(() => props.customClass || '')

</script>

<template>
    <div :class="[bgClass, iconColor, customClass]" v-html="icons[props.icon]">
    </div>
</template>

<style scoped>
    :deep(svg) {
        height: v-bind(getSize);
        width: v-bind(getSize);
    }
</style>

