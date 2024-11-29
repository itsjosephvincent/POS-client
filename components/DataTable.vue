<script setup lang="ts">
import type { DataTableColumns } from '~/common/types';

const viewport = useViewport();
const emit = defineEmits(['sortData', 'nextPage', 'previousPage', 'rowClick']);

interface DataTableActions {
    key: string;
    label: string;
    handler: Function;
}
interface DataTableProps {
    columns: Array<DataTableColumns>;
    dataSource?: Array<object>;
    columnHeaderClass?: Function;
    columnClass?: Function;
    actions?: Array<DataTableActions>;
    showPagination?: boolean;
    rowsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
    searchPlaceholder?: string;
    hasCreateButton?: boolean;
    createButtonLabel?: string;
    createButtonHandler?: Function;
    loading?: boolean;
}
const props = defineProps<DataTableProps>();
const getColumnClass = (row: object, columnKey: string): string => {
    return props.columnClass ? props.columnClass(row, columnKey) : '';
};
const getHeaderColumnClass = (columnKey: string): string =>
    props.columnHeaderClass ? props.columnHeaderClass(columnKey) : '';
const currentSortColumn = ref('');
const currentSortDirection = ref('ascend');
const getActions = computed(() => props.actions || []);
function toggleSorting(column: DataTableColumns) {
    if (!column.sortable) return;
    if (column.key === currentSortColumn.value) {
        currentSortDirection.value =
            currentSortDirection.value === 'ascend' ? 'descend' : 'ascend';
        currentSortColumn.value = column.key;
        emit('sortData', column.key, currentSortDirection.value);
    } else {
        currentSortColumn.value = column.key;
        currentSortDirection.value = 'ascend';
        emit('sortData', column.key, currentSortDirection.value);
    }
}
</script>

<template>
    <div
        :class="[
            'relative w-full bg-transparent flex flex-col justify-center',
            props.loading ? 'opacity-50' : '',
        ]"
    >
        <div
            class="min-w-full rounded-xl overflow-hidden border border-gray-200"
        >
            <table
                :class="[
                    'table-fixed min-w-full border-collapse rounded-lg select-none',
                ]"
            >
                <thead>
                    <tr
                        class="bg-primaryColor text-white font-bold border-gray-200"
                    >
                        <th
                            v-for="column in props.columns"
                            :key="column.key"
                            @click="toggleSorting(column)"
                            :class="[
                                'px-4 py-3 cursor-pointer select-none',
                                viewport.isLessThan('tablet') &&
                                column.desktopOnly
                                    ? 'hidden'
                                    : '',
                            ]"
                        >
                            <div
                                :class="[
                                    getHeaderColumnClass(column.key),
                                    'flex items-center gap-2',
                                ]"
                            >
                                {{ column.label }}
                                <!-- Add sorting indicator -->
                                <span
                                    v-if="
                                        currentSortColumn === column.key &&
                                        !!column.sortable
                                    "
                                >
                                    <IconSvg
                                        :icon="
                                            currentSortDirection === 'ascend'
                                                ? 'up'
                                                : 'down'
                                        "
                                        color="white"
                                    />
                                </span>
                            </div>
                        </th>
                        <th
                            v-if="props.actions?.length"
                            class="px-4 py-3 text-center"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-if="!props.loading"
                        v-for="(row, rowIndex) in props.dataSource"
                        :key="rowIndex"
                        @click="$emit('rowClick', row)"
                        class="odd:bg-white even:bg-gray-100 cursor-default hover:bg-sky-300/20 overflow-x-auto"
                    >
                        <td
                            v-for="column in props.columns"
                            :key="column.key"
                            :class="[
                                getColumnClass(row, column.key),
                                'px-4 h-16',
                                viewport.isLessThan('tablet') &&
                                column.desktopOnly
                                    ? 'hidden'
                                    : '',
                            ]"
                        >
                            <slot
                                :name="`column-${column.key}`"
                                :row="row"
                                :column="column"
                            >
                                {{ row[column.key] }}
                            </slot>
                        </td>
                        <!-- Render Action Buttons -->
                        <td
                            v-if="getActions.length"
                            class="px-4 h-16 flex justify-center items-center"
                        >
                            <span
                                v-for="(action, index) in actions"
                                :key="index"
                                @click.stop="action.handler(row)"
                                class="mx-1"
                            >
                                <slot :name="`action-${action.key}`"> </slot>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination Controls -->
        <div
            v-if="props.showPagination && !props.loading"
            class="flex justify-center items-center mt-4 select-none"
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

        <div v-if="props.loading" class="absolute top-[55px] left-1/2 z-20">
            <IconSvg icon="loading" color="primaryColor" size="40px" />
        </div>
    </div>
</template>
