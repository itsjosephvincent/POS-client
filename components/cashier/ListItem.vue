<script setup lang="ts">
import {
    TransactionMode,
    type BillingProduct,
    type Table,
} from '~/common/types';
import { runningBillService } from '~/api/cashier/RunningBillService';
import useRunningBillFetch from '~/components/cashier/composables/useRunningBillFetch';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const loadingStore = useLoadingStore();
const props = defineProps<{
    productData: BillingProduct;
}>();
const isLoading: Ref<boolean> = ref(false);

const quantity: Ref<number> = ref(0);
const isAdded = ref(false);
watch(
    () => runningBillStore.getProducts,
    (value) => {
        updateRunningBillItems();
    },
    { deep: true, immediate: true },
);
function updateRunningBillItems() {
    const products: Array<BillingProduct> = runningBillStore.getProducts;
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
    // if (isAdded.value) {
    //     transactionStore.removeProduct(props.productData.uuid);
    // }
    // transactionStore.addProduct({
    //     id: props.productData.id,
    //     uuid: props.productData.uuid,
    //     name: props.productData.name,
    //     cost: props.productData.cost,
    //     price: props.productData.price,
    //     quantity: quantity.value,
    //     image: props.productData.image,
    // });
}
function decrement() {
    quantity.value = quantity.value <= 0 ? 0 : quantity.value - 1;
    // if (quantity.value <= 0) {
    //     transactionStore.removeProduct(props.productData.uuid);
    //     return;
    // }
    // if (isAdded.value) {
    //     transactionStore.removeProduct(props.productData.uuid);
    // }
    // transactionStore.addProduct({
    //     id: props.productData.id,
    //     uuid: props.productData.uuid,
    //     name: props.productData.name,
    //     cost: props.productData.cost,
    //     price: props.productData.price,
    //     quantity: quantity.value,
    //     image: props.productData.image,
    // });
}
async function addToTransaction() {
    isLoading.value = true;
    if (transactionStore.getMode === TransactionMode.RunningBill) {
        await updateRunningBill();
        isLoading.value = false;
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
                    uuid: item.product.uuid,
                    name: item.product.name,
                    cost: item.product.cost,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image,
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
