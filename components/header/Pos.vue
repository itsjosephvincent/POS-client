<script setup lang="ts">
import { black } from '~/constants/colors.js'

</script>

<template>
    <div class="w-full bg-inherit">
        <div class="flex h-18 w-full p-2 z-10 bg-inherit items-center justify-center md:justify-between">
            <div class="hidden md:block px-6 font-bold text-lg">Choose Category</div>
            <HeaderSearch />
        </div>
        <div class="flex gap-4 m-2 mx-8">
            <ItemCategoryCard name="All">
                <IconItems :color="black" />
            </ItemCategoryCard>
            <ItemCategoryCard name="Coffee">
                <IconCoffee :color="black" />
            </ItemCategoryCard>
            <ItemCategoryCard name="Snacks">
                <IconFood :color="black" />
            </ItemCategoryCard>
            <ItemCategoryCard name="Meals">
                <IconMeals :color="black" />
            </ItemCategoryCard>
        </div>
    </div>
</template>
