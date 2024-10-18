<script setup lang="ts">
const pageTitle = 'Tables';

definePageMeta({
    layout: 'store',
    middleware: ['store'],
});
useHead({
    title: pageTitle,
});
onMounted(() => {
    navigateTo('/store/tables');
});
</script>

<template>
    <div></div>
</template>
