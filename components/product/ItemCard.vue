<script setup lang="ts">

const props = defineProps<{
    productData: object
    editHandler: Function
    deleteHandler: Function
}>()

function cardClick() {
    navigateTo(`/admin/skus/${props.productData.uuid}`)
}

</script>

<template>
    <div @click="cardClick"
        class="w-full max-w-lg h-44 overflow-y-hidden md:h-56 bg-secondaryBg rounded-xl border border-primaryBorder flex flex-col items-start justify-start">
        <img v-if="props.productData.image" :src="props.productData.image" :alt="props.productData.name"
            class="w-full h-20 md:h-32 object-cover md:object-cover md:py-0 rounded-t-xl">
        <img v-else src="~/assets/img/noimg_medium.png" :alt="props.productData.name"
            class="w-full h-20 md:h-32 object-cover md:object-cover md:py-0 rounded-t-xl">
        <div class="w-full h-full flex items-center justify-between px-1 md:px-2">
            <div class="block grow px-2 py-2 overflow-hidden text-xs md:text-base">
                <div class="font-bold text-primaryText">{{ props.productData.price }}</div>
                <div class="text-secondaryText">{{ props.productData.name }}</div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
                <button @click.stop="props.editHandler(props.productData)" class="p-1 rounded-full bg-secondaryColor text-white">
                    <IconSvg icon="edit" color="white" size="1em" />
                </button>
                <button @click.stop="props.deleteHandler(props.productData)" class="p-1 rounded-full bg-errorColor text-white">
                    <IconSvg icon="delete" color="white" size="1em" />
                </button>
            </div>
        </div>
    </div>
</template>