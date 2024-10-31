<script setup lang="ts">
import { categoryService } from '~/api/cashier/CategoryService';

// const store = useCategoryStore();
// function selectCategory(category: string) {
//     store.setCurrent(category);
// }

// const classificationsData = ref([]);
// onMounted(() => {
//     fetch();
// });

// async function fetch() {
//     try {
//         const response = await categoryService.fetch();
//         if (response.data) {
//             classificationsData.value = response.data;
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
</script>

<template>
    <div
        class="w-full bg-secondaryBg border-b border-primaryBorder py-3 px-4 flex justify-between items-center"
    >
        <CashierProductSearch />
        <CashierUserMenu />
    </div>
</template>
