<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import icons from '~/constants/icons.js'

const props = defineProps({
    icon: { type: String, required: true, },
    color: { type: String, required: true, },
})

const getFillColor = computed(() => icons[props.icon]['fill'] ? props.color : 'none')
const getStrokeColor = computed(() => icons[props.icon]['stroke'] ? props.color : 'none')

</script>

<template>
    <div class="icon" v-html="icons[props.icon]['svg']">
    </div>
</template>

<style scoped>
    :deep(path), :deep(g) {
        fill: v-bind(getFillColor);
        stroke: v-bind(getStrokeColor);
    }
</style>