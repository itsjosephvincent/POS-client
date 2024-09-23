<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    name: { type: String, required: true, },
    choices: { type: Array, required: true, },
})

</script>

<template>
    <div class="w-1/2 p-2">
        <div class="text-primaryText mb-2 text-sm font-bold">{{ name }}</div>
        <div class="flex gap-1">
            <PosItemOptionChoice v-for="(item, index) in choices" :key="index" :name="item" :index="index" />   
        </div>
    </div>

</template>
