<script setup lang="ts">

const props = defineProps<{
    label: string
    handler?: Function
    icon?: string
    loading?: boolean
}>()
const getLabel = computed(() => props.label )
const getLoading = computed(() => props.loading || false)


</script>

<template>
    <button :class="['rounded-xl border border-primaryBorder bg-secondaryColor py-2 px-3 flex items-center justify-center gap-2 text-white']">
        <IconSvg v-if="icon" :icon="icon" color="#fff" size="1.5em" />
        <span v-if="!loading">{{ getLabel }}</span>
        <IconSvg v-else icon="loading" color="white" />
    </button>
</template>