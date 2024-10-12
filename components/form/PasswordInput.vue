<script setup lang="ts">

const props = defineProps<{
    name: string
    placeholder: string
    label?: string
    modelValue?: any
    bgClass?: string
    showIcon?: boolean
    error?: string
}>()

const isPassword = ref(true)
const type = computed(() => isPassword.value ? 'password' : 'text')
const currentIcon = computed(() => isPassword.value ? 'eyeClosed' : 'eye')
const getBgClass = computed(() => props.bgClass || 'bg-primaryBg')
const errorClass = computed(() => props.error ? 'border-2 border-red-500' : '')

function toggleMode() {
    isPassword.value = !isPassword.value
    console.log(isPassword.value)
}
</script>

<template>
    <div class="w-full">
        <div v-if="label" :class="['ml-2 text-primaryText']">{{ label }}</div>
        <div :class="['relative h-12 rounded-xl flex items-center bg-primaryBg border border-primaryBorder',]">
            <IconSvg v-if="showIcon" class="mr-4 absolute left-2" icon="password" color="tertiaryText" size="1.5em" />
            <input :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
                :name="props.name" :id="props.name" :placeholder="props.placeholder"
                :class="['grow border-0 outline-0 text-primaryText focus:border focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-full w-full rounded-xl px-4 pr-[57px]', getBgClass, !showIcon ? '' : 'pl-[60px]', errorClass]">
            <IconSvg @click="toggleMode" class="mr-4 absolute right-2" :icon="currentIcon" color="tertiaryText" size="1.5em" />
        </div>
        <div :class="['px-1 pt-1 text-sm text-errorColor', error ? 'visible': 'invisible']">{{ error }}</div>
    </div>
</template>
