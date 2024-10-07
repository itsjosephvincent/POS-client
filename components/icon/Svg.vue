<script setup lang="ts">
import icons from '~/constants/icons.js'

const props = defineProps<{
    icon: string
    color?: string
    bgColor?: string
    size?: string
    customClass?: string
}>()

const bgClass = computed(() => props.bgColor ? 'bg-' + props.bgColor : '')
const iconColor = computed(() => props.color ? 'text-' + props.color : 'text-primaryText')
const width = computed(() => props.size ? `w-[${props.size}]` : 'w-[1.5em]')
const height = computed(() => props.size ? `h-[${props.size}]` : 'h-[1.5em]')
const customClass = computed(() => props.customClass || '')

</script>

<template>
    <div :class="[bgClass, iconColor, width, height, customClass]" v-html="icons[props.icon]">
    </div>
</template>

