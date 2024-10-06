<script setup lang="ts">

const props = defineProps<{
    dataSource?: Array<object>
    searchPlaceholder?: string
    hasCreateButton?: boolean
    createButtonLabel?: string
    createButtonHandler?: Function
    loading?: boolean
    showPagination?: boolean
    rowsPerPage?: number
    totalPages?: number
    currentPage?: number
}>()

</script>

<template>
    <div class="w-full flex justify-start items-start flex-wrap gap-2">
        <div v-for="item in props.dataSource" :key="item.id" class="w-full md:w-[200px] bg-secondaryBg rounded-xl md:border md:border-primaryBorder flex flex-col items-start justify-start">
            <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-[150px] object-cover rounded-t-xl">
            <img v-else src="~/assets/img/noimg_medium.png" :alt="item.name" class="w-full h-[150px] object-cover rounded-t-xl" >
            <div class="block p-4">
                <div class="font-bold text-primaryText">{{ item.price }}</div>
                <div class="text-secondaryText">{{ item.name }}</div>
                <div class="text-secondaryText">{{ item.inventory }} remaining</div>
            </div>
        </div>
    </div>
</template>