<script setup lang="ts">
import { usePage } from '~/composables/usePage.ts'

const { title } = usePage()
</script>

<template>
    <div class="w-full bg-inherit">
        <div class="flex h-[60px] w-full p-2 z-10 bg-primaryColor items-center justify-center md:justify-between">
            <div class="hidden md:block px-6 font-bold text-lg text-primaryText">{{ title }}</div>
            <div class="flex gap-4 items-center">
            </div>
        </div>
    </div>
</template>
