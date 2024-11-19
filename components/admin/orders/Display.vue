<script setup lang="ts">
import { orderService } from '~/api/admin/OrderService';
import type { Order } from '~/common/types';

const route = useRoute();
const emit = defineEmits(['orderFetch']);

const orderData: Ref<Order | null> = ref(null);
const isFetching = ref(false);

onMounted(() => {
    fetchProduct();
});

async function fetchProduct() {
    try {
        isFetching.value = true;
        const order_uuid = route.params.uuid;
        const response = await orderService.find(order_uuid, {});
        isFetching.value = false;
        if (response.data) {
            console.log(response.data);
            emit('orderFetch', response.data);
            orderData.value = response.data;
        }
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
</script>

<template>
    <div>
        <LoadingCardSkeleton v-if="isFetching" />
        <div
            v-if="orderData"
            class="w-full max-w-lg lg:w-[500px] p-6 bg-secondaryBg lg:border lg:border-primaryBorder lg:rounded-xl"
        >
            Order Detail
        </div>
    </div>
</template>
