<script setup lang="ts">

const props = defineProps({
    label: { type: String, required: true },
    bgColor: { type: String, required: false },
    loading: { type: Boolean, required: true, },
})

</script>

<template>
    <button :class="`w-full h-12 bg-primaryColor rounded-xl select-none text-lg font-bold text-white flex items-center gap-4 justify-center`">
        <span v-if="!loading">{{ props.label }}</span>
        <IconSvg v-else icon="loading" color="white" />
    </button>
</template>
