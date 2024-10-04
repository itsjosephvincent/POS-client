<script setup lang="ts">

const props = defineProps<{
    uuid: string
    name: string
    cost: string
    price: string
    inventory: number
    image?: string
}>()

</script>

<template>
    <div class="w-full lg:w-[500px] p-6 bg-secondaryBg lg:border lg:border-primaryBorder lg:rounded-xl flex flex-col md:flex md:flex-row justify-center items-center gap-4 cursor-pointer text-primaryColor">
        <img v-if="props.image" :src="props.image" alt="product image" class="w-[200px] object-contain" >
        <img v-else src="~/assets/img/noimg_medium.png" alt="product image" class="w-[200px] object-contain" >
        <div class="w-full flex flex-col items-start grow">
            <div class="font-bold select-none text-xl">{{ props.name }}</div>
            <div class="font-bold text-primaryText">
                <span class="pr-2 font-medium text-secondaryText">Cost</span>{{ props.cost }}
            </div>
            <div class="font-bold text-primaryText">
                <span class="pr-2 font-medium text-secondaryText">Price</span>{{ props.price }}
            </div>
            <div class="font-bold text-primaryText">
                <span class="pr-2 font-medium text-secondaryText">Inventory Count</span>{{ props.inventory }}
            </div>
            <div class="w-full flex flex-col md:flex-row gap-2 mt-4">
                <PrimaryButton label="Edit" class="w-full h-[38px]"/>
                <PrimaryButton label="Delete" bg-color="bg-errorColor" class="w-full h-[38px]"/>
            </div>
        </div>
    </div>
</template>