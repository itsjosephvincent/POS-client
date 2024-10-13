<script setup lang="ts">
const props = defineProps<{
    dataSource?: Array<object>;
    searchPlaceholder?: string;
    hasCreateButton?: boolean;
    createButtonLabel?: string;
    createButtonHandler?: Function;
    loading?: boolean;
    showPagination?: boolean;
    rowsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
    deleteHandler?: Function;
    editHandler?: Function;
}>();

const emit = defineEmits(['sortData', 'nextPage', 'previousPage', 'rowClick']);
</script>

<template>
    <div class="w-full">
        <LoadingProductListSkeleton v-if="props.loading" />
        <div v-else class="w-full">
            <div
                class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 justify-start items-start flex-wrap gap-2"
            >
                <ProductItemCard
                    v-for="item in props.dataSource"
                    :key="item.id"
                    :product-data="item"
                    :delete-handler="props.deleteHandler"
                    :edit-handler="props.editHandler"
                />
            </div>
        </div>
        <!-- Pagination Controls -->
        <div
            v-if="props.showPagination && !props.loading"
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
    </div>
</template>
