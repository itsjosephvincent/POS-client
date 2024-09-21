<script setup lang="ts">
import { coffee } from '~/test-data/coffee.js'

definePageMeta({
    layout: 'pos'
})

</script>

<template>
    <div class="flex justify-center h-[calc(100%-64px)] w-full">
        <div class="overflow-y-scroll p-4 pb-4 flex flex-col grow sm:flex-row sm:flex-wrap items-center sm:justify-start">
            <PosItemCards v-for="item in coffee" :key="item.id" :item="item.title" :description="item.description" :image-src="item.image" />
        </div>
    </div>
</template>
