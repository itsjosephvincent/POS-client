<script setup lang="ts">

const props = defineProps<{
    error: string
}>()

</script>

<template>
    <div
        :class="`${!props.error ? 'invisible' : ''} w-full rounded-lg bg-red-100 p-3 text-errorColor flex items-center gap-4`">
        <IconSvg icon="error" color="errorColor" /><span>{{ props.error }}</span>
    </div>
</template>