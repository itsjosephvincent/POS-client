<script setup lang="ts">
const props = defineProps<{
    title: string;
    summary: string;
    icon?: string;
    cardClass?: string;
}>();

const cardStyle = computed(() =>
    props.cardClass
        ? props.cardClass
        : 'border border-primaryBorder bg-white text-primaryText',
);
</script>

<template>
    <div
        :class="[
            'relative w-full md:w-48 rounded-xl p-4 min-h-32 flex flex-col items-start justify-center cursor-default select-none',
            cardStyle,
        ]"
    >
        <div class="">
            <div class="text-inherit">{{ title }}</div>
            <div class="font-bold text-inherit text-lg">{{ summary }}</div>
        </div>
        <IconSvg
            v-if="icon"
            class="absolute right-2 top-2"
            :icon="icon"
            size="1.5em"
            color="text-inherit"
        />
    </div>
</template>
