<script setup lang="ts"></script>

<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
.date-picker {
    width: 340px;
    height: 40px;
}
.date-picker-input {
    border-radius: 0.75rem;
    line-height: 26px;
}
.dp__main {
    font-family: 'Poppins', sans-serif;
}
.dp__input_focus {
    border-color: var(--secondary-color);
    border-width: 2px;
}
.dp__input_icon {
    color: var(--text-primary);
}
</style>
