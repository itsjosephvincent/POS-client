<script setup lang="ts">

const props = defineProps<{
    name: string
    label: string
    placeholder: string
    type?: string
    modelValue?: any
    icon?: string
    postIcon?: string
    iconSize?: string
    iconColor?: string
    bgClass?: string
    borderClass?: string
}>()

const viewPassword = ref(false)
const getType = computed(() => props.type || 'text')
const getBgClass = computed(() => props.bgClass || 'bg-secondaryBg')
const getBorderClass = computed(() => props.borderClass || 'border border-primaryBorder')
const getIconSize = computed(() => props.iconSize || '1.5em' )
const inputPadding = computed(() => props.icon ? 'pl-[60px]' : '')
const postIconInputPadding = computed(() => props.postIcon ? 'pr-[57px]' : '')

</script>

<template>
    <div class="w-full max-w-96 ">
        <div v-if="label" :class="['ml-2 text-primaryText']">{{ props.label }}</div>
        <div :class="['relative h-12 rounded-xl flex items-center', getBgClass, getBorderClass]">
            <IconSvg v-if="props.icon" class="mr-4 absolute left-[10px]" :icon="props.icon" color="var(--text-tertiary)" height="1.5em" width="1.5em" />
            <input :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="props.type"
                :name="props.name" :id="props.name" :placeholder="props.placeholder"
                :class="['grow border-0 outline-0 text-primaryText focus:border focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-full w-full rounded-xl px-4', getBgClass, inputPadding, postIconInputPadding]">
            <IconSvg v-if="props.postIcon" class="mr-4 absolute right-[10px]" :icon="props.postIcon" :color="props.iconColor || 'var(--text-primary)'" :size="getIconSize" />
        </div>
    </div>
</template>
