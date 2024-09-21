<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useItemStore } from '~/stores/item.js'

const props = defineProps({
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
const isActive = ref(false)

const store = useItemStore()
function onClick(item: string) {
   store.setCurrent(item) 
}

watch(() => store.getCurrent, (current: string) => {
    isActive.value = current === props.item
})
const borderClass = computed(() => isActive.value ? 'border-2 border-slate-500 scale-110' : 'border border-slate-200')

onMounted(() => {
    isActive.value = store.getCurrent === props.item
})
</script>

<template>
    <div @click="onClick(item)" :class="`w-80 h-[412px] m-3 mb-5 p-3 bg-white ${borderClass} rounded-xl cursor-pointer select-none transition ease-out delay-200`">
        <div class="w-full h-full flex flex-col justify-around">
            <div class="flex gap-3 mb-4">
                <img class="w-28 h-32 rounded-xl object-cover" :src="imageSrc" :alt="item" />
                <div class="grow">
                    <div class="font-bold text-cm-black text-lg">{{ item }}</div>
                    <div class="text-gray-400 text-xs max-h-16 overflow-hidden">{{ description }}</div>
                    <div class="font-bold text-cm-black text-lg">P 350</div>
                </div>
            </div>
            <div class="w-full flex flex-wrap mb-4">
                <PosItemOptions v-for="item in options" :key="item.name" :name="item.name" :choices="item.choices" />
            </div>

            <button v-if="isActive" type="button" class="w-full bg-slate-500 text-white rounded-lg py-2 mb-4">Add to Billing</button>
        </div> 
    </div>
</template>
