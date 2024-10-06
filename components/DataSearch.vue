<script setup lang="ts">

const props = defineProps<{
    placeholder?: string
}>()

</script>

<template>
    <div class="w-[250px] lg:w-[300px] h-[42px] bg-secondaryBg rounded-xl border border-primaryBorder flex items-center px-4">
        <input type="text" name="search" id="search" :placeholder="props.placeholder ? props.placeholder : 'Filter items...'" class="w-3/4 border-0 grow outline-0 text-secondaryText bg-secondaryBg text-xs">
        <IconSvg icon="search" />
    </div>
</template>