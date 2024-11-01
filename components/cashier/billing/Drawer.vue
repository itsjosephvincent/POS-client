<script setup lang="ts">
import { TransactionMode, DrawerPage } from '~/common/types';

const viewport = useViewport();

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const drawerPageStore = useDrawerPageStore();
const cartStore = useCartStore();

const openDrawerMobile: Ref<boolean> = ref(false);
const orderUuid: Ref<string | null> = ref(null);

function toggle() {
    openDrawerMobile.value = !openDrawerMobile.value;
}
function onSuccessOrder(uuid: string) {
    orderUuid.value = uuid;
}
function clearOrder() {
    orderUuid.value = null;
}

const getContainerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (openDrawerMobile.value) {
            return 'z-20 h-screen w-screen fixed bottom-0 left-0 bg-gray-700/70';
        } else {
            return 'h-0 w-screen fixed bottom-0 left-0 bg-gray-700/70';
        }
    }
    return '';
});
const getDrawerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        return 'select-none z-20 fixed bottom-0 left-0 h-screen w-screen duration-500 bg-secondaryBg';
    } else {
        return 'z-20 w-[400px] h-screen flex flex-col bg-secondaryBg border-l border-primaryBorder';
    }
});
const getButtonCss = computed(() => {
    if (openDrawerMobile.value) {
        return ' opacity-0';
    } else {
        return 'opacity-100';
    }
});
const displayDrawer = computed(() => {
    if (viewport.isLessThan('desktop')) {
        return openDrawerMobile.value;
    } else {
        return true;
    }
});
const hasOrder = computed(() => {
    return transactionStore.getMode === TransactionMode.RunningBill
        ? !!runningBillStore.getProducts
        : !!cartStore.getProducts.length;
});
const buttonLabelMobile = computed(() => {
    if (transactionStore.getMode === TransactionMode.RunningBill) {
        let total = runningBillStore.getTotal;
        return `${runningBillStore?.getTable?.name} - P${(total + total * 0.1).toFixed(2)}`;
    } else {
        let total = runningBillStore.getTotal;
        return `Cart - P${(total + total * 0.1).toFixed(2)}`;
    }
});
</script>

<template>
    <div :class="getContainerCss">
        <Transition name="slide-up">
            <div
                v-show="displayDrawer"
                :class="[
                    getDrawerCss,
                    'flex flex-col justify-start items-start',
                ]"
            >
                <CashierBillingOrders
                    v-show="
                        drawerPageStore.getPage === DrawerPage.Orders &&
                        !orderUuid
                    "
                    @drawer-toggle="toggle"
                    @order-success="onSuccessOrder"
                />
                <CashierBillingPayment
                    v-if="orderUuid"
                    :order-uuid="orderUuid"
                    @clear-order="clearOrder"
                />
            </div>
        </Transition>
        <Teleport
            v-if="viewport.isLessThan('desktop') && !openDrawerMobile"
            to="body"
        >
            <div
                :class="[
                    'w-full flex justify-center px-2 fixed bottom-2 transition delay-[2000ms] ease-in-out',
                    getButtonCss,
                ]"
            >
                <PrimaryButton
                    @click="toggle"
                    :label="buttonLabelMobile"
                    custom-class="bg-secondaryColor rounded-xl w-full text-white"
                />
            </div>
        </Teleport>
    </div>
</template>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
    transform: translateY(0);
}
</style>
