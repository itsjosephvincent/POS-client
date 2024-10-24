<script setup lang="ts">
import { cartService } from '~/api/cashier/CartService';
import { TransactionMode, type BillingProduct } from '~/common/types';

const transactionStore = useTransactionStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const loadingStore = useLoadingStore();

function tabClick(mode: TransactionMode) {
    transactionStore.setMode(mode);
    if (mode === TransactionMode.Cart) {
        cartFetch();
    }
}

async function cartFetch() {
    try {
        loadingStore.setLoading(true);
        console.log('fetch cart');
        const params = {};
        const response = await cartService.fetch(params);
        loadingStore.setLoading(false);
        if (!response.data) throw 'No data fetched for cart ';
        const cartProducts: Array<BillingProduct> = response.data.map(
            (item: any) => {
                return {
                    id: item.product.id,
                    uuid: item.uuid,
                    name: item.product.name,
                    cost: item.product.cost,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image,
                    is_voided: item.is_voided,
                };
            },
        );
        cartStore.setProducts(cartProducts);
    } catch (error) {
        loadingStore.setLoading(false);
        console.error(error);
    }
}

const baseClass = computed(() => 'font-bold text-primaryText');
const activeClass = computed(
    () => 'font-bold text-secondaryColor border-b-2 border-secondaryColor',
);
</script>

<template>
    <div class="w-full mx-2 mt-2 flex justify-start items-center gap-4">
        <div
            @click="tabClick(TransactionMode.RunningBill)"
            :class="[
                'p-2 cursor-pointer',
                transactionStore.getMode === TransactionMode.RunningBill
                    ? activeClass
                    : baseClass,
            ]"
        >
            Dine In
        </div>
        <div
            @click="tabClick(TransactionMode.Cart)"
            :class="[
                'p-2 cursor-pointer',
                transactionStore.getMode === TransactionMode.Cart
                    ? activeClass
                    : baseClass,
            ]"
        >
            Take Out
        </div>
    </div>
</template>
