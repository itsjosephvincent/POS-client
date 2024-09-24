<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useItemStore } from '~/stores/item.js'
import { useBillingStore } from '~/stores/billing.js';

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
const itemStore = useItemStore()
const billingStore = useBillingStore()

function onClick() {
   itemStore.setCurrent(props.item) 
}

function addToBilling() {
    billingStore.addItem(props)
}

watch(() => itemStore.getCurrent, (current: string) => {
    isActive.value = current === props.item
})
const borderClass = computed(() => isActive.value ? 'border-2 border-secondaryBorder' : 'border border-primaryBorder')

onMounted(() => {
    isActive.value = itemStore.getCurrent === props.item
})
</script>

<template>
    <div @click="onClick" :class="`w-[calc(95%)] md:w-[80%] lg:w-80 m-3 mb-5 p-3 bg-secondaryBg ${borderClass} rounded-xl cursor-pointer select-none`">
        <div class="w-full h-full flex flex-col justify-around">
            <div class="flex items-center gap-3 mb-4">
                <img class="w-28 h-32 rounded-xl object-cover" :src="imageSrc" :alt="item" />
                <div class="grow flex flex-col justify-center">
                    <div class="font-bold text-primaryText text-lg">{{ item }}</div>
                    <div class="text-tertiaryText text-xs grow overflow-hidden">{{ description }}</div>
                    <div class="font-bold text-primaryText text-lg">P 350</div>
                </div>
            </div>
            <div class="w-full flex flex-wrap mb-4">
                <PosItemOptions v-for="item in options" :key="item.name" :name="item.name" :choices="item.choices" />
            </div>

            <button v-if="isActive" @click="addToBilling" type="button" class="w-full bg-primaryColor text-white rounded-lg py-2 mb-4">Add to Billing</button>
        </div> 
    </div>
</template>
