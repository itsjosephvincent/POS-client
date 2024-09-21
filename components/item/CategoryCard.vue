<script setup lang="ts">
    defineProps({
        name: { type: String, required: true, },
    })
</script>

<template>
    <div class="w-20 h-20 bg-white border-slate-100 rounded-xl flex flex-col justify-center items-center gap-2">
        <slot />
        <div class="font-bold text-cm-black">{{ name }}</div> 
    </div>
</template>
