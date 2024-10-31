<script setup lang="ts">
import { categoryService } from '~/api/admin/CategoryService';

const route = useRoute();
const emit = defineEmits(['categoryFetch']);
const userStore = useUserStore();

onMounted(() => {
    fetch();
});

const categoryData = ref(null);
const isFetching = ref(true);

async function fetch() {
    try {
        isFetching.value = true;
        let params = {};
        const response = await categoryService.find(
            route.params.uuid.toString(),
        );
        isFetching.value = false;
        if (response && response.data) {
            const data = response.data;
            categoryData.value = data;
            emit('categoryFetch', data);
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
</script>

<template>
    <div class="w-full">
        <div
            v-if="isFetching"
            class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6"
        >
            <LoadingProductSkeleton />
        </div>
        <AdminCategoriesForm v-else :is-edit="true" :edit-data="categoryData" />
    </div>
</template>
