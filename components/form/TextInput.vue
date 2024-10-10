<script setup lang="ts">

const props = defineProps<{
    name: string
    label?: string
    placeholder: string
    type?: string
    modelValue?: any
    icon?: string
    postIcon?: string
    iconSize?: string
    iconColor?: string
    bgClass?: string
    borderClass?: string
    error?: string
}>()

const viewPassword = ref(false)
const getType = computed(() => props.type || 'text')
const getBgClass = computed(() => props.bgClass || 'bg-secondaryBg')
const getBorderClass = computed(() => props.borderClass || 'border border-primaryBorder')
const errorClass = computed(() => props.error ? 'border-2 border-red-500' : '')
const getIconSize = computed(() => props.iconSize || '1.5em' )
const inputPadding = computed(() => props.icon ? 'pl-[60px]' : '')
const postIconInputPadding = computed(() => props.postIcon ? 'pr-[57px]' : '')


</script>

<template>
    <div class="w-full">
        <div v-if="label" :class="['ml-2 text-primaryText']">{{ label }}</div>
        <div :class="['relative h-12 rounded-xl flex items-center', getBgClass, getBorderClass]">
            <IconSvg v-if="icon" class="mr-4 absolute left-2" :icon="icon" color="tertiaryText" size="1.5em" />
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
                :name="name" :id="name" :placeholder="placeholder"
                :class="['grow border-0 outline-0 text-primaryText focus:border focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-full w-full rounded-xl px-4', getBgClass, inputPadding, postIconInputPadding, errorClass]">
            <IconSvg v-if="postIcon" class="mr-4 absolute right-2" :icon="postIcon" :color="iconColor || 'primaryText'" size="1.5em" />
        </div>
        <div :class="['px-1 pt-1 text-sm text-errorColor', error ? 'visible': 'invisible']">{{ error }}</div>
    </div>
</template>
