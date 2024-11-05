<script setup lang="ts">
import { TransactionMode, type BillingProduct } from '~/common/types';
import { orderService } from '~/api/cashier/OrderService';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';
import { cartService } from '~/api/cashier/CartService';

const emit = defineEmits(['orderSuccess']);
const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const drawerPageStore = useDrawerPageStore();
const cartStore = useCartStore();
const loadingStore = useLoadingStore();
const isPaymentMethod = ref(false);
const isLoading: Ref<boolean> = ref(false);

interface OrderRequestParams {
    table_uuid?: string;
    payment: number;
}
function processOrderClick() {
    transactionStore.setPayment(true);
}

const total = computed(() =>
    transactionStore.getMode === TransactionMode.RunningBill
        ? runningBillStore.getTotal
        : cartStore.getTotal,
);
async function processTableOrder() {
    try {
        isLoading.value = true;
        let params: OrderRequestParams = {
            payment:
                transactionStore.getMode === TransactionMode.RunningBill
                    ? runningBillStore.getTotal
                    : cartStore.getTotal,
        };
        if (transactionStore.getMode === TransactionMode.RunningBill) {
            if (!runningBillStore.getTable) throw 'No table data.';
            params.table_uuid = runningBillStore.getTable?.uuid;
        }
        const response = await orderService.create(params);
        isLoading.value = false;
        if (!response.data) throw 'Error in creating order';
        // alert(
        //     `Successfully processed Order number: ${response.data.order_number}`,
        // );
        emit('orderSuccess', response.data.uuid);

        updateBills();
    } catch (error) {
        console.error(error);
        isLoading.value = false;
    }
}
async function updateBills() {
    try {
        loadingStore.setLoading(true);

        if (transactionStore.getMode === TransactionMode.RunningBill) {
            if (!runningBillStore.getTable) throw 'No table data.';
            await runningBillsRefetch(runningBillStore.getTable.uuid);
        } else {
            await cartRefetch();
        }
        loadingStore.setLoading(false);
    } catch (error) {
        loadingStore.setLoading(false);
        console.error(error);
    }
}

async function cartRefetch() {
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
async function runningBillsRefetch(table_uuid: any) {
    try {
        loadingStore.setLoading(true);
        console.log('fetch running bills table: ', table_uuid);
        const params = {
            table: table_uuid,
        };
        const response = await useRunningBillFetch().fetch(params);
        loadingStore.setLoading(false);
        if (!response)
            throw 'No data fetched for running bills table: ' + table_uuid;
        const runningBillProducts: Array<BillingProduct> = response.map(
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
        runningBillStore.setProducts(runningBillProducts);
    } catch (error) {
        loadingStore.setLoading(false);
        console.error(error);
    }
}
</script>

<template>
    <div class="w-full">
        <div class="m-2 flex justify-between font-bold text-primaryText">
            <div class="">Subtotal</div>
            <div class="">P{{ total.toFixed(2) }}</div>
        </div>
        <div
            class="m-2 flex justify-between font-bold text-sm text-tertiaryText"
        >
            <div class="">Tax (10%)</div>
            <div class="">P{{ (total * 0.1).toFixed(2) }}</div>
        </div>
        <div
            class="m-2 border-b-2 border-dashed border-tertiaryText mt-4"
        ></div>
        <div class="mx-2 m-4 flex justify-between font-bold text-primaryText">
            <div class="">Total</div>
            <div class="">P{{ (total + total * 0.1).toFixed(2) }}</div>
        </div>
        <div class="flex justify-center items-center">
            <PrimaryButton
                label="Process Order"
                :loading="isLoading"
                class="bg-primaryColor"
                @click="processTableOrder"
                custom-class="bg-secondaryColor text-white w-full m-2"
            />
        </div>
    </div>
</template>
