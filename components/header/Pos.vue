<script setup lang="ts">
import { watch, computed } from 'vue'
import { useCategoryStore } from '~/stores/category.js'
import { useThemeStore } from '~/stores/theme.js'
import { categories } from '~/test-data/categories.js'

const store = useCategoryStore()
const themeStore = useThemeStore()

function selectCategory(category: string) {
    store.setSelected(category)
}

function toggleTheme() {
    themeStore.toggle()
}

const getThemeIcon = computed(() => themeStore.theme === 'dark' ? 'moon' : 'sun')

</script>

<template>
    <div class="w-full bg-inherit">
        <div class="flex h-18 w-full p-2 z-10 bg-inherit items-center justify-center md:justify-between">
            <div class="hidden md:block px-6 font-bold text-lg text-primaryText">Choose Category</div>
            <div class="flex gap-4 items-center">
                <IconSvg class="cursor-pointer" @click="toggleTheme" :icon="getThemeIcon" color="primaryText" />
                <HeaderSearch />
            </div>
        </div>
        <div class="flex gap-4 m-2 mx-8">
            <ItemCategoryCard v-for="item in categories" @category-select="selectCategory" :name="item.name" :key="item.id">
                <IconSvg :icon="item.icon" color="primaryText" />
            </ItemCategoryCard>
        </div>
    </div>
</template>
