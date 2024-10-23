import { defineStore } from 'pinia';
import type { Cart, BillingProduct } from '~/common/types';

interface CartState {
    products: Array<BillingProduct>;
}
export const useCartStore = defineStore(
    'cart',
    () => {
        const state: CartState = reactive({
            products: [],
        });

        function reset() {
            state.products = [];
        }
        function setProducts(products: Array<BillingProduct>) {
            state.products = products;
        }
        function addProduct(product: BillingProduct) {
            state.products.push(product);
        }
        function removeProduct(uuid: string) {
            state.products = state.products.filter(
                (item) => item.uuid !== uuid,
            );
        }

        const getProducts = computed(() => state.products);
        const getTotal = computed(() =>
            state.products.reduce(
                (total, item) => total + item.price * item.quantity,
                0,
            ),
        );

        return {
            state,
            reset,
            addProduct,
            setProducts,
            removeProduct,
            getProducts,
            getTotal,
        };
    },
    { persist: false },
);
