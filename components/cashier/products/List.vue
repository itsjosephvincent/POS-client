<script setup lang="ts">
import type { Product } from '~/common/types';

const props = defineProps<{
    dataSource?: Array<Product> | null;
    loading?: boolean;
    showPagination?: boolean;
    rowsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
}>();

const emit = defineEmits(['sortData', 'nextPage', 'previousPage', 'rowClick']);
const isEmpty = computed(() => !props?.dataSource?.length || false);
</script>

<template>
    <div class="w-full h-[calc(100%-135px)] overflow-y-auto">
        <LoadingProductListSkeleton v-if="props.loading" />
        <div v-else class="w-full flex justify-center">
            <div
                class="w-full flex flex-wrap justify-center md:justify-start items-start gap-4 mx-4"
            >
                <CashierPurchaseListItem
                    v-for="item in props.dataSource"
                    :key="item.id"
                    :product-data="item"
                />
            </div>
        </div>
        <!-- Pagination Controls -->
        <div
            v-if="props.showPagination && !props.loading && !isEmpty"
            class="w-full flex justify-center items-center mt-4 select-none"
        >
            <button
                :disabled="props.currentPage === 1"
                @click="$emit('previousPage')"
                class="px-4 py-2 disabled:text-gray-500"
            >
                Previous
            </button>
            <button
                v-for="page in totalPages"
                :key="page"
                @click="$emit('goToPage', page)"
                :class="[
                    'px-4 py-2',
                    currentPage === page
                        ? 'text-secondaryColor font-semibold'
                        : 'text-secondaryText hover:bg-gray-400/20 rounded-full',
                ]"
            >
                {{ page }}
            </button>
            <button
                :disabled="props.currentPage === totalPages"
                @click="$emit('nextPage')"
                class="px-4 py-2 disabled:text-gray-500"
            >
                Next
            </button>
        </div>
        <div v-if="isEmpty" class="my-6 mx-2">No items to show.</div>
    </div>
</template>
