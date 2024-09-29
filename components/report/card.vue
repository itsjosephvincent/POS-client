<script setup lang="ts">

const props = defineProps({
    background: { type: String, required: false, },
    color: { type: String, required: false, },
    title: { type: String, required: true, },
    subTitle: { type: String, required: true, },
    description: { type: String, required: true, },
    icon: { type: String, required: true, },
    iconColor: { type: String, required: false, },
})
const backgroundStyle = computed(() => props.background || 'bg-secondaryBg')
const textColorStyle = computed(() => props.color || 'text-white')
const iconColor = computed(() => props.iconColor || '#ffffff')
</script>

<template>
    <div :class="`m-3 mb-5 py-1 pl-4 pr-6 ${backgroundStyle} rounded-xl cursor-pointer select-none`">
        <div class="flex items-center justify-start gap-6 mb-4">
            <IconSvg :icon="props.icon" size="2em" :color="iconColor" />
            <div class="grow flex flex-col justify-center">
                <div :class="`font-bold ${textColorStyle} text-lg`">{{ props.title }}</div>
                <div :class="`font-bold ${textColorStyle} text-sm`">{{ props.subTitle }}</div>
                <div :class="`font-bold ${textColorStyle} text-sm`">{{ props.description }}</div>
            </div>
        </div>
    </div>
</template>