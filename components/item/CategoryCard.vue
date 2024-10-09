<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCategoryStore } from '~/stores/category.js'

const props = defineProps({
    name: { type: String, required: true, },
})

const isActive = ref(false)
const store = useCategoryStore()
watch(() => store.getSelected, (selected?: string) => {
    console.log(selected)
    selected === props.name ? isActive.value = true : isActive.value = false
})

const getStyle = computed(() => (
    isActive.value ? 'border-2 border-secondaryBorder' 
    : 'border border-primaryBorder' 
))

onMounted(() => {
    isActive.value = store.getSelected === props.name
})

</script>

<template>
    <div @click="$emit('categorySelect', name)" :class="['w-24 h-24 bg-secondaryBg text-wrap rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer', getStyle]">
        <slot />
        <div class="font-bold text-primaryText select-none">{{ name }}</div>
    </div>
</template>
