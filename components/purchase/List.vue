<script setup lang="ts">

const props = defineProps<{
    dataSource?: Array<object>
    loading?: boolean
    showPagination?: boolean
    rowsPerPage?: number
    totalPages?: number
    currentPage?: number
}>()

const emit = defineEmits(['sortData', 'nextPage', 'previousPage', 'rowClick'])


</script>

<template>
    <div class="w-full">
        <LoadingProductListSkeleton v-if="props.loading" />
        <div v-else class="w-full flex justify-center">
            <div class="w-full md:max-w-[95%] flex flex-wrap justify-center md:justify-start items-start gap-4">
                <PurchaseListItem v-for="item in props.dataSource" :key="item.id" :product-data="item" />
            </div>
        </div>
        <!-- Pagination Controls -->
        <div v-if="props.showPagination && !props.loading"
            class="w-full flex justify-center items-center mt-4 select-none">
            <button :disabled="props.currentPage === 1" @click="$emit('previousPage')"
                class="px-4 py-2 disabled:text-gray-500">
                Previous
            </button>
            <button v-for="page in totalPages" :key="page" @click="$emit('goToPage', page)" :class="[
                'px-4 py-2',
                currentPage === page ? 'text-secondaryColor font-semibold' : 'text-secondaryText hover:bg-gray-400/20 rounded-full',
            ]">
                {{ page }}
            </button>
            <button :disabled="props.currentPage === totalPages" @click="$emit('nextPage')"
                class="px-4 py-2 disabled:text-gray-500">
                Next
            </button>
        </div>
    </div>
</template>