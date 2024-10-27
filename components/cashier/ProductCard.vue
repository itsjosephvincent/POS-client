<script setup lang="ts">
import {
    TransactionMode,
    type BillingProduct,
    type Table,
} from '~/common/types';
import { runningBillService } from '~/api/cashier/RunningBillService';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';
import { cartService } from '~/api/cashier/CartService';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const cartStore = useCartStore();
const loadingStore = useLoadingStore();
const props = defineProps<{
    productData: BillingProduct;
}>();
const isLoading: Ref<boolean> = ref(false);

const quantity: Ref<number> = ref(0);
const isAdded = ref(false);
watch(
    () => runningBillStore.getProducts,
    () => {
        if (transactionStore.getMode === TransactionMode.RunningBill)
            checkAddedProducts();
    },
    { deep: true, immediate: true },
);
watch(
    () => cartStore.getProducts,
    () => {
        if (transactionStore.getMode === TransactionMode.Cart)
            checkAddedProducts();
    },
    { deep: true, immediate: true },
);

/**
 * Checks and updates the css of current Product Card if it was added in Cart/Running Bill
 */
function checkAddedProducts() {
    const products: Array<BillingProduct> =
        transactionStore.getMode === TransactionMode.Cart
            ? cartStore.getProducts
            : runningBillStore.getProducts;
    let item = products.find(
        (i: BillingProduct) => i.uuid === props.productData.uuid,
    );
    if (item) {
        isAdded.value = true;
        quantity.value = item.quantity;
    } else {
        isAdded.value = false;
        quantity.value = 0;
    }
}
function increment() {
    quantity.value++;
}
function decrement() {
    quantity.value = quantity.value <= 0 ? 0 : quantity.value - 1;
}
async function addToTransaction() {
    isLoading.value = true;
    if (transactionStore.getMode === TransactionMode.RunningBill) {
        await updateRunningBill();
        isLoading.value = false;
    } else {
        await updateCart();
        isLoading.value = false;
    }
}
async function updateCart() {
    if (transactionStore.getMode !== TransactionMode.Cart) return;
    try {
        const product: BillingProduct = props.productData;
        const params = {
            product_uuid: product.uuid,
            product_id: product.id,
            quantity: quantity.value,
            price: product.price,
        };
        const response = await cartService.create(params);
        if (!response.data) throw 'Error no response.';
        console.log(response.data);
        cartRefetch();
    } catch (error: any) {
        console.error(error);
        alert(error.getErrorMessage());
    }
}
async function updateRunningBill() {
    if (transactionStore.getMode !== TransactionMode.RunningBill) return;
    try {
        const product: BillingProduct = props.productData;
        const table: Table | null = runningBillStore.getTable;
        if (!table) throw 'No table data.';
        const params = {
            table_id: table.id,
            table_uuid: table.uuid,
            product_uuid: product.uuid,
            product_id: product.id,
            quantity: quantity.value,
            price: product.price,
        };
        const response = await runningBillService.create(params);
        if (!response.data) throw 'Error no response.';
        console.log(response.data);
        runningBillsRefetch(table.uuid);
    } catch (error: any) {
        console.error(error);
        alert(error.getErrorMessage());
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
const getBorderClass = computed(() =>
    quantity.value === 0
        ? 'border border-primaryBorder'
        : 'border-4 border-secondaryColor',
);

const canOrder = computed((): boolean => {
    if (transactionStore.getMode === TransactionMode.RunningBill) {
        return !!runningBillStore.getTable && quantity.value > 0;
    } else if (transactionStore.getMode === TransactionMode.Cart) {
        return quantity.value > 0;
    }
    return false;
});
</script>

<template>
    <div
        :class="[
            'w-[90%] h-fit max-w-80 lg:max-w-64 sm:w-[40%] md:w-[30%] lg:w-[30%] overflow-y-hidden bg-secondaryBg rounded-xl flex flex-col items-start justify-start',
            getBorderClass,
        ]"
    >
        <img
            v-if="props.productData.image"
            :src="props.productData.image"
            :alt="props.productData.name"
            class="w-full h-32 md:h-32 object-cover md:object-cover md:py-0"
        />
        <img
            v-else
            src="~/assets/img/noimg_medium.png"
            :alt="props.productData.name"
            class="w-full h-32 md:h-32 object-cover md:object-cover md:py-0"
        />
        <div class="w-full h-28 flex items-center justify-between px-1 md:px-2">
            <div
                class="block grow px-2 py-2 overflow-hidden md:text-base overflow-y-auto"
            >
                <div class="font-bold text-primaryText">
                    {{ props.productData.price }}
                </div>
                <div class="text-secondaryText">
                    {{ props.productData.name }}
                </div>
            </div>
            <div class="flex justify-center items-center gap-2">
                <button
                    @click="decrement"
                    class="p-1 rounded-full border border-primaryBorder"
                >
                    <IconSvg icon="minus" />
                </button>
                <span
                    :class="
                        quantity > 0
                            ? 'font-bold text-primaryText'
                            : 'text-secondaryText'
                    "
                    >{{ quantity }}</span
                >
                <button
                    @click="increment"
                    class="p-1 rounded-full border border-primaryBorder"
                >
                    <IconSvg icon="plus" />
                </button>
            </div>
        </div>
        <div class="w-full py-4 px-2">
            <PrimaryButton
                @click="addToTransaction"
                class="w-full self-center"
                :label="isAdded ? 'Update Order' : 'Add Order'"
                :disabled="!canOrder"
                :loading="isLoading"
            />
        </div>
    </div>
</template>
