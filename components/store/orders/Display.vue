<script setup lang="ts">
import { orderService } from '~/api/store/OrderService';
import type { Order, OrderDetail } from '~/common/types';

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

function formatDateTime(dateTime: string) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours: string | number = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    hours = String(hours).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

const getTotal = computed(() => {
    return orderData.value?.orderDetails.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
});
</script>

<template>
    <div>
        <LoadingCardSkeleton v-if="isFetching" />
        <div
            v-if="orderData"
            class="w-full max-w-lg lg:w-[500px] p-0 lg:p-6 bg-secondaryBg lg:border lg:border-primaryBorder lg:rounded-xl"
        >
            <div class="font-bold text-primaryText text-lg mb-1">
                Order #{{ orderData.order_number }}
            </div>
            <div class="text-sm text-secondaryText text-lg mb-4">
                {{ formatDateTime(orderData.created_at) }}
            </div>
            <div class="">
                <div
                    v-for="item in orderData.orderDetails"
                    :class="[
                        'px-4 py-2 flex justify-between items-center text-primaryText gap-2',
                    ]"
                >
                    <div class="flex justify-start items-center gap-2">
                        <img
                            :src="item.product.image"
                            :alt="item.product.name"
                            class="w-11 h-11 rounded-xl object-cover"
                        />
                        <div class="font-bold w-48">
                            {{ item.product.name }}
                        </div>
                    </div>
                    <div class="w-32 text-wrap break-words">
                        <div
                            class="font-medium text-secondaryText text-xs text-right"
                        >
                            {{ item.quantity }} x
                            {{ item.price }}
                        </div>
                        <div class="font-bold text-right">
                            {{
                                (
                                    parseFloat(item.price) *
                                    parseInt(item.quantity)
                                ).toFixed(2)
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="m-2 flex justify-between font-bold text-secondaryText text-md"
            >
                <div class="">Subtotal</div>
                <div class="">P{{ getTotal }}</div>
            </div>
            <div
                class="m-2 border-b-2 border-dashed border-tertiaryText mt-4"
            ></div>
            <div
                class="mx-2 m-4 flex justify-between font-bold text-primaryText text-lg"
            >
                <div class="">Total</div>
                <div class="">P{{ getTotal }}</div>
            </div>
        </div>
    </div>
</template>
