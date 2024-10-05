<script setup lang="ts">

const props = defineProps<{
    label: string
    handler?: Function
    icon?: string
    loading?: boolean
    disabled?: boolean
    bgColor?: string
}>()
const getLabel = computed(() => props.label )
const getBgClass = computed(() => props.bgColor ? props.bgColor : 'bg-secondaryColor')

</script>

<template>
    <button :class="['rounded-xl h-[46px] border border-primaryBorder py-2 px-3 flex items-center justify-center gap-2 text-white disabled:opacity-50 hover:opacity-70', getBgClass]" 
    :disabled="props.disabled">
        <IconSvg v-if="icon" :icon="icon" color="#fff" size="1.5em" />
        <span v-if="!loading">{{ getLabel }}</span>
        <IconSvg v-else icon="loading" color="white" />
    </button>
</template>