<script setup lang="ts">
import { useCategoryStore } from '~/stores/category.js'
import { categories } from '~/test-data/categories.js'
import { classificationService } from '../api/ClassificationService'

const store = useCategoryStore()
function selectCategory(category: string) {
    store.setSelected(category)
}

const classificationsData = ref([])
onMounted(() => {
    fetch()
})

async function fetch() {
    try {
        const response = await classificationService.all()
        if (response.data) {
            classificationsData.value = response.data
        }
    } catch(error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="w-full bg-secondaryBg border-b border-primaryBorder py-3 px-4 flex justify-between items-center">
        <PosProductSearch />
        <PosCashierMenu />
    </div>
</template>