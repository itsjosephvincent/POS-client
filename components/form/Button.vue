<script setup lang="ts">

const props = defineProps({
    label: { type: String, required: true },
    bgColor: { type: String, required: false },
})

</script>

<template>
    <button :class="`w-[calc(90%)] max-w-96 h-12 bg-primaryColor rounded-xl select-none text-lg font-bold text-primaryText`">
        {{ props.label }}
    </button>
</template>