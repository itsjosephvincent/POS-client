<script setup lang="ts">

const props = defineProps<{
    label: string
    handler?: Function
    icon?: string
    iconColor?: string
    loading?: boolean
    disabled?: boolean
    customClass?: string
}>()
const getLabel = computed(() => props.label )
const getClass = computed(() => props.customClass || 'py-2 px-3 border border-primaryBorder  bg-secondaryColor text-white')

</script>

<template>
    <button :class="['h-[46px] rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-70', getClass]" 
    :disabled="props.disabled">
        <IconSvg v-if="icon" :icon="icon" :color="props.iconColor || 'white'" />
        <span v-if="!loading">{{ getLabel }}</span>
        <IconSvg v-else icon="loading" color="white" size="30px" />
    </button>
</template>