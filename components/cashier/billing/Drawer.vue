<script setup lang="ts">
import { TransactionMode } from '~/common/types';

const viewport = useViewport();

const transactionStore = useTransactionStore();

const openDrawer = ref(false);
function toggle() {
    openDrawer.value = !openDrawer.value;
}

const getContainerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (openDrawer.value) {
            return 'h-screen w-screen fixed bottom-0 left-0 bg-gray-700/70';
        } else {
            return 'h-0 w-screen fixed bottom-0 left-0 bg-gray-700/70';
        }
    }
    return '';
});
const getDrawerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (openDrawer.value) {
            return 'z-20 fixed bottom-0 left-0 h-screen w-screen duration-500 bg-secondaryBg';
        } else {
            return 'z-20 fixed bottom-0 left-0 h-0 w-screen duration-500 bg-secondaryBg';
        }
    } else {
        return 'z-20 lg:w-[400px] duration-500 h-screen flex flex-col bg-secondaryBg border-l border-primaryBorder';
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
            <CashierBillingTabs />
            <CashierBillingTables
                v-if="transactionStore.getMode === TransactionMode.RunningBill"
            />
            <CashierBillingItems class="mt-2 grow" />
            <CashierBillingTotal />
            <CashierBillingPayment />
        </div>
        <Teleport
            v-if="viewport.isLessThan('desktop') && !openDrawer"
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
                    label="Proceed New Order"
                    custom-class="bg-secondaryColor rounded-xl w-full text-white"
                />
            </div>
        </Teleport>
    </div>
</template>
