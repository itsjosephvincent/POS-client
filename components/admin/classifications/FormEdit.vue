<script setup lang="ts">
import { categoryService } from '~/api/admin/CategoryService';

const route = useRoute();
const emit = defineEmits(['classificationFetch']);
const userStore = useUserStore();

onMounted(() => {
    fetch();
});

const classificationData = ref(null);
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
            console.log(response.data);
            const data = response.data;
            classificationData.value = data;
            emit('classificationFetch', data);
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
        <AdminClassificationsForm
            v-else
            :is-edit="true"
            :edit-data="classificationData"
        />
    </div>
</template>
