<script setup lang="ts">

const props = defineProps<{
    label?: string
    handler?: Function
}>()
const getLabel = computed(() => props.label || 'Add New' )

</script>

<template>
    <div>
        <button class="rounded-lg border border-primaryBorder bg-secondaryColor py-2 px-3 flex items-center gap-2 text-white">
            <IconSvg icon="plus" color="#fff" size="1.5em" />
            {{ getLabel }}
        </button>
    </div>
</template>