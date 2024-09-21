<script setup lang="ts">
import { watch } from 'vue'
import { black } from '~/constants/colors.js'
import { useCategoryStore } from '~/stores/category.js'
import { categories } from '~/test-data/categories.js'
import { IconItems, IconCoffee, IconFood, IconMeals } from '#components'

const store = useCategoryStore()
const iconComponents = {
    'all': IconItems,
    'coffee': IconCoffee,
    'snacks': IconFood,
    'meals': IconMeals,
}

function selectCategory(category: string) {
    store.setSelected(category)
}


watch(() => store.getSelected, (selected?: string) => {
    console.log(selected)
})

</script>

<template>
    <div class="w-full bg-inherit">
        <div class="flex h-18 w-full p-2 z-10 bg-inherit items-center justify-center md:justify-between">
            <div class="hidden md:block px-6 font-bold text-lg">Choose Category</div>
            <HeaderSearch />
        </div>
        <div class="flex gap-4 m-2 mx-8">
            <ItemCategoryCard v-for="item in categories" @category-select="selectCategory" :name="item.name" :key="item.id">
                <component :is="iconComponents[item.icon]" :color="black"></component>
            </ItemCategoryCard>
        </div>
    </div>
</template>
