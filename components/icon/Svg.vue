<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import icons from '~/constants/icons.js'

const props = defineProps({
    icon: { type: String, required: true, },
    color: { type: String, required: true, },
    height: { type: String, required: false, },
    width: { type: String, required: false, },
})

const getFillColor = computed(() => icons[props.icon]['fill'] ? props.color : 'none')
const getStrokeColor = computed(() => icons[props.icon]['stroke'] ? props.color : 'none')
const getHeight = computed(() => props.height ? props.height : '2em')
const getWidth = computed(() => props.width ? props.width : '2em')

</script>

<template>
    <div class="icon" v-html="icons[props.icon]['svg']">
    </div>
</template>

<style scoped>
    :deep(svg) {
        height: v-bind(getHeight);
        width: v-bind(getWidth);
    }
    :deep(path), :deep(g) {
        fill: v-bind(getFillColor);
        stroke: v-bind(getStrokeColor);
    }
</style>