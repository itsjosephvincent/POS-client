<script setup lang="ts">

const emitEvent = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<{
    modelValue: any
    label?: string
}>(), {
    modelValue: true
})

const isChecked = ref(props.modelValue)
function toggleSwitch() {
    isChecked.value = !isChecked.value
    emitEvent('update:modelValue', isChecked.value)
}
watch(
    () => props.modelValue,
    (newValue) => {
        isChecked.value = newValue
    }
)
</script>

<template>
    <div class="">
        <div v-if="label" :class="['ml-2 text-primaryText']">{{ label }}</div>
        <div :class="[
            'relative inline-flex items-center ml-2 w-12 h-6 rounded-full cursor-pointer transition',
            { 'bg-secondaryColor': isChecked, 'bg-gray-400': !isChecked }
        ]" @click="toggleSwitch">
            <span :class="[
                'switch-handle inline-block mx-1 w-5 h-5 bg-white rounded-full transition-transform duration-500 ease-in-out',
                { 'translate-x-5': isChecked, 'translate-x-0': !isChecked }
            ]"></span>
        </div>
    </div>
</template>