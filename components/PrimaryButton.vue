<script setup lang="ts">
const viewport = useViewport();
const props = defineProps<{
    label: string;
    handler?: Function;
    icon?: string;
    iconColor?: string;
    loading?: boolean;
    disabled?: boolean;
    customClass?: string;
    small?: boolean;
}>();
const getLabel = computed(() => props.label);
const getClass = computed(
    () =>
        props.customClass ||
        'py-2 px-3 border border-primaryBorder  bg-secondaryColor text-white',
);
const roundedClass = computed(() => {
    return props.icon && viewport.isLessThan('desktop')
        ? 'rounded-full'
        : 'rounded-xl';
});
</script>

<template>
    <button
        :class="[
            'h-10 flex items-center justify-center gap-2 disabled:opacity-50',
            getClass,
            roundedClass,
        ]"
        :disabled="props.disabled"
    >
        <IconSvg
            v-if="props.icon"
            :icon="props.icon"
            :color="props.iconColor || 'white'"
        />
        <span v-if="!loading" :class="small ? 'hidden md:block' : ''">{{
            getLabel
        }}</span>
        <IconSvg v-if="loading" icon="loading" color="white" size="2em" />
    </button>
</template>
