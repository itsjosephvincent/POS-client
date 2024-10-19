<script setup lang="ts">
import { useBillingStore } from '~/stores/billing.js';

const store = useBillingStore();
const viewport = useViewport();

const openDrawer = ref(false);
function toggle() {
    openDrawer.value = !openDrawer.value;
}

const hasBilling = computed(() => store.getItems.length > 0);
const getContainerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (openDrawer.value) {
            return 'h-screen w-screen fixed bottom-0 left-0 bg-gray-700/70';
        }
    }
    return '';
});
const getDrawerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (openDrawer.value) {
            return 'z-50 fixed bottom-0 left-0 h-screen w-screen duration-500 bg-secondaryBg';
        } else {
            return 'z-50 fixed bottom-0 left-0 h-0 w-screen duration-500 bg-secondaryBg';
        }
    } else {
        return 'z-50 lg:w-72 duration-500 h-screen flex flex-col bg-secondaryBg border-l border-primaryBorder';
    }
});
const getButtonCss = computed(() => {
    if (openDrawer.value) {
        return ' opacity-0';
    } else {
        return 'opacity-100';
    }
});
</script>

<template>
    <div :class="getContainerCss">
        <div :class="['relative select-none', getDrawerCss]">
            <IconSvg
                @click="toggle"
                v-if="viewport.isLessThan('desktop')"
                icon="left"
                size="1.5em"
                class="cursor-pointer z-10 pt-6 pl-4"
            />

            <div class="w-full pt-2 px-2">
                <CashierTableSelect />
                <div class="font-bold text-lg text-primaryText mx-2 xl:mx-6">
                    Billing Details
                </div>
            </div>
            <CashierPurchaseBillingItems class="mt-2 grow" />
            <CashierPurchaseBillingTotal class="" v-if="hasBilling" />
            <CashierPurchaseBillingPayment class="" v-if="hasBilling" />
        </div>
        <Teleport v-if="viewport.isLessThan('tablet') && !openDrawer" to="body">
            <div
                :class="[
                    'w-full flex justify-center px-2 fixed bottom-2 transition delay-[2000ms] ease-in-out',
                    getButtonCss,
                ]"
            >
                <PrimaryButton
                    @click="toggle"
                    label="Proceed New Order"
                    custom-class="bg-secondaryColor rounded-xl w-full text-white"
                />
            </div>
        </Teleport>
    </div>
</template>
