<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    item: { type: String, required: true, },
    description: { type: String, required: true, },
    imageSrc: { type: String, required: true, },
})

const options = ref([
    { name: 'Mood', choices: ['hot', 'cold'] },
    { name: 'Size', choices: ['s', 'm', 'l'] },
    { name: 'Sugar', choices: ['30%', '50%', '70%'] },
    { name: 'Ice', choices: ['30%', '50%', '70%'] },
])
</script>

<template>
    <div class="w-80 m-3 mb-5 p-3 bg-white border border-slate-200 rounded-xl">
        <div class="w-full">
            <div class="flex gap-3 mb-4">
                <img class="w-28 h-32 rounded-xl object-cover" :src="imageSrc" :alt="item" />
                <div class="grow">
                    <div class="font-bold text-cm-black text-lg">{{ item }}</div>
                    <div class="text-gray-400 text-xs max-h-16 overflow-hidden">{{ description }}</div>
                    <div class="font-bold text-cm-black text-lg">P 350</div>
                </div>
            </div>
            <div class="w-full flex flex-wrap">
                <PosItemOptions v-for="item in options" :key="item.name" :name="item.name" :choices="item.choices" />
            </div>
        </div> 
    </div>
</template>
