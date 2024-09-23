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
    isActive.value ? 'w-20 h-20 bg-secondaryBg border-2 border-secondaryBorder rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer' 
    : 'w-20 h-20 bg-secondaryBg border border-primaryBorder rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer' 
))

onMounted(() => {
    isActive.value = store.getSelected === props.name
})

</script>

<template>
    <div @click="$emit('categorySelect', name)" :class="getStyle">
        <slot />
        <div class="font-bold text-primaryText select-none">{{ name }}</div>
    </div>
</template>
