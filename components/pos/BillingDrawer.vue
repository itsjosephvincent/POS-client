<script setup lang="ts">
import { useBillingStore } from '~/stores/billing.js'

const store = useBillingStore()
const viewport = useViewport()

const openDrawer = ref(false)
function toggle() {
    openDrawer.value = !openDrawer.value
}

const hasBilling = computed(() => store.getItems.length > 0)
const getContainerCss = computed(() => {
    if (viewport.isLessThan('desktop')) {
        if (openDrawer.value) {
            return 'z-50 fixed transition-all duration-500 bottom-0 h-screen w-screen bg-secondaryBg'
        } else {
            return 'z-50 fixed transition-all duration-500 bottom-0 h-0 w-screen'
        }
    } else {
        return 'z-50 lg:w-72 transition-all duration-500 h-screen lg:flex flex-col bg-secondaryBg border-l border-primaryBorder'
    }
})
const getButtonCss = computed(() => {
    if (openDrawer.value) {
        return ' opacity-0'
    } else {
        return 'opacity-100'
    }
})

</script>

<template>
    <div>
        <Teleport v-if="viewport.isLessThan('desktop') && !openDrawer" to="body">
            <div :class="['w-full flex justify-center px-2 fixed bottom-2 transition delay-[2000ms] ease-in-out', getButtonCss]">
                <PrimaryButton @click="toggle" label="Proceed New Order - P 200" custom-class="bg-secondaryColor rounded-xl w-full text-white" />
            </div>
        </Teleport>
        <div :class="[getContainerCss]">
            <div class="flex justify-start items-center gap-2 mx-2 md:mx-0 border-b border-primaryBorder xl:border-0">
                <IconSvg @click="openDrawer = false" v-if="viewport.isLessThan('desktop')" icon="left" size="1.5em" class="cursor-pointer" />
                <BillingCashier />
            </div>
            <BillingItems class="my-2 grow" />
            <BillingTotal class="" v-if="hasBilling" />
            <BillingPayment class="" v-if="hasBilling" />
        </div>
    </div>
    
</template>