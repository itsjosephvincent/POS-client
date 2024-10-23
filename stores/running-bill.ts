import { defineStore } from 'pinia';
import type { Table, BillingProduct } from '~/common/types';

interface RunningBillState {
    table: Table | null;
    products: Array<BillingProduct>;
}
export const useRunningBillStore = defineStore(
    'running-bill',
    () => {
        const state: RunningBillState = reactive({
            table: null,
            products: [],
        });

        function reset() {
            state.table = null;
            state.products = [];
        }
        function setTable(table: Table) {
            state.table = table;
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

        const getTable = computed(() => state.table);
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
            setTable,
            addProduct,
            setProducts,
            removeProduct,
            getTable,
            getProducts,
            getTotal,
        };
    },
    { persist: false },
);
