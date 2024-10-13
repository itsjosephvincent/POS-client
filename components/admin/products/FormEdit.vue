<script setup lang="ts">
import { productService } from '~/api/admin/ProductService';

const route = useRoute();
const emit = defineEmits(['productFetch']);
onMounted(() => {
    fetch();
});

const productData = ref(null);
const isFetching = ref(true);

async function fetch() {
    try {
        isFetching.value = true;
        let params = {};
        const response = await productService.find(route.params.uuid, params);
        isFetching.value = false;
        if (response && response.data) {
            console.log(response.data);
            const data = response.data;
            productData.value = data;
            emit('productFetch', data);
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
        <AdminProductsForm v-else :is-edit="true" :edit-data="productData" />
    </div>
</template>
