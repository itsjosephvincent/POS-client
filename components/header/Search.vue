<script setup lang="ts">
import { gray } from '~/constants/colors.js'
</script>

<template>
    <div class="w-[250px] md:w-[300px] lg:w-[400px] h-12 bg-secondaryBg rounded-xl border border-secondaryBorder flex items-center px-4">
        <input type="text" name="search" id="search" placeholder="Search category or items..." class="w-3/4 border-0 grow outline-0 text-secondaryText bg-secondaryBg text-xs">
        <IconSvg icon="search" color="primaryText" />
    </div>
</template>
