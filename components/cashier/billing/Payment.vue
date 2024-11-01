<script setup lang="ts">
import { orderService } from '~/api/cashier/OrderService';
import { DrawerPage, type Order, type OrderDetail } from '~/common/types';

const emit = defineEmits(['clearOrder']);
const drawerPageStore = useDrawerPageStore();

const props = defineProps<{
    orderUuid: string;
}>();

const order: Ref<Order | null> = ref(null);
const orderDetails: Ref<Array<OrderDetail> | null> = ref(null);

onMounted(() => {
    fetch();
});

async function fetch() {
    try {
        const params = {};
        const response = await orderService.find(props.orderUuid, params);
        if (!response.data) throw 'Error fetching order';
        order.value = response.data;
        orderDetails.value = response.data.orderDetails;
    } catch (error) {
        console.error(error);
    }
}
function onNewOrderClick() {
    drawerPageStore.setPage(DrawerPage.Orders);
    emit('clearOrder');
}
const getDateString = computed(() => {
    let date = new Date(order.value?.created_at || '');
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
    }).format(date);
});
const getTotal = computed(() => {
    if (!orderDetails.value) return 0.0;
    return orderDetails.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
});
</script>

<template>
    <div class="w-full h-full my-4">
        <div
            v-if="order"
            class="w-full h-full flex flex-col justify-start items-center"
        >
            <IconSvg icon="success" size="5em" color="successColor" />
            <div class="text-lg font-bold text-successColor">
                Order Successful!
            </div>
            <div
                class="w-full h-full px-4 py-4 flex flex-col justify-start items-center"
            >
                <div class="py-1 text-sm text-primaryText text-wrap">
                    {{ getDateString }}
                </div>
                <div class="mb-4 py-1 text-sm text-primaryText text-wrap">
                    Order No. {{ order.order_number }}
                </div>
                <!--ITEMS-->
                <div
                    class="w-full flex flex-col justify-start items-center grow"
                >
                    <div
                        v-for="item in orderDetails"
                        :key="item.id"
                        class="w-full flex justify-between items-center"
                    >
                        <div class="py-1 text-sm text-secondaryText text-wrap">
                            {{ item.product.name }} x{{ item.quantity }}
                        </div>
                        <div class="py-1 text-sm text-secondaryText text-wrap">
                            P{{
                                parseFloat(
                                    (item.quantity * item.price).toString(),
                                ).toFixed(2)
                            }}
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div class="py-1 text-sm text-primaryText text-wrap">
                            Subtotal
                        </div>
                        <div class="py-1 text-sm text-primaryText text-wrap">
                            P{{ parseFloat(getTotal.toString()).toFixed(2) }}
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div class="py-1 text-sm text-secondaryText text-wrap">
                            Tax(10%)
                        </div>
                        <div class="py-1 text-sm text-secondaryText text-wrap">
                            P{{ (getTotal * 0.1).toFixed(2) }}
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div class="py-1 text-sm text-primaryText text-wrap">
                            Total
                        </div>
                        <div class="py-1 text-sm text-primaryText text-wrap">
                            P{{
                                parseFloat(
                                    (getTotal + getTotal * 0.1).toString(),
                                ).toFixed(2)
                            }}
                        </div>
                    </div>
                </div>

                <div class="w-full flex justify-start items-center gap-1 mt-4">
                    <PrimaryButton
                        label="Print Receipt"
                        icon="printer"
                        class="w-full"
                    />
                    <PrimaryButton
                        @click="onNewOrderClick"
                        label="New Order"
                        icon="plus"
                        class="w-full"
                        custom-class="bg-successColor text-white"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
