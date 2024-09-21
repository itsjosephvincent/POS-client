<script setup lang="ts">
defineProps({
    name: { type: String, required: true, },
    color: { type: String, required: false, },
    icon: { type: String, required: false, },
    index: { type: Number, required: true, },
})
</script>

<template>
    <div :class="`flex items-center justify-center rounded-full w-10 h-10 bg-slate-100 border border-slate-600 text-xs text-slate-800`">
        {{ name }}
    </div>
</template>
