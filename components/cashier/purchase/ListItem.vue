<script setup lang="ts">
const billingStore = useBillingStore();
const props = defineProps<{
    productData: object;
}>();

const quantity = ref(0);
const isAdded = ref(false);
watch(
    () => billingStore.getItems,
    (items) => {
        let item = items.find((i: object) => i.uuid === props.productData.uuid);
        isAdded.value = !!item;
        if (item) {
            quantity.value = item.quantity;
        }
    },
    { deep: true },
);
onMounted(() => {
    let item = billingStore.getItems.find(
        (i: object) => i.uuid === props.productData.uuid,
    );
    isAdded.value = !!item;
    if (item) {
        quantity.value = item.quantity;
    }
});
function increment() {
    quantity.value++;
    if (isAdded.value) {
        billingStore.removeItem(props.productData.uuid);
    }
    billingStore.addItem({
        uuid: props.productData.uuid,
        name: props.productData.name,
        cost: props.productData.cost,
        price: props.productData.price,
        image: props.productData.image,
        quantity: quantity.value,
    });
}
function decrement() {
    quantity.value = quantity.value <= 0 ? 0 : quantity.value - 1;
    if (quantity.value <= 0) {
        billingStore.removeItem(props.productData.uuid);
        return;
    }
    if (isAdded.value) {
        billingStore.removeItem(props.productData.uuid);
    }
    billingStore.addItem({
        uuid: props.productData.uuid,
        name: props.productData.name,
        cost: props.productData.cost,
        price: props.productData.price,
        image: props.productData.image,
        quantity: quantity.value,
    });
}
const getBorderClass = computed(() =>
    quantity.value === 0
        ? 'border border-primaryBorder'
        : 'border-4 border-secondaryColor',
);
</script>

<template>
    <div
        :class="[
            'w-[90%] h-52 max-w-80 lg:max-w-64 sm:w-[40%] md:h-64 md:w-[30%] lg:w-[30%] overflow-y-hidden bg-secondaryBg rounded-xl flex flex-col items-start justify-start',
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
        <div
            class="w-full h-full flex items-center justify-between px-1 md:px-2"
        >
            <div class="block grow px-2 py-2 overflow-hidden md:text-base">
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
    </div>
</template>
