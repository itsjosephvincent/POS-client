<script setup lang="ts">
defineProps({
    name: { type: String, required: true, },
    color: { type: String, required: false, },
    icon: { type: String, required: false, },
    index: { type: Number, required: true, },
})
</script>

<template>
    <div :class="`flex items-center justify-center rounded-full w-10 h-10 bg-tertiaryColor border border-primaryColor text-xs text-slate-800`">
        {{ name }}
    </div>
</template>
