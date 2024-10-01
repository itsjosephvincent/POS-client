<script setup lang="ts">

const emit = defineEmits(['sortData', 'nextPage', 'previousPage'])
interface DataTableColumns {
    key: string
    label: string
}
interface DataTableActions {
    key: string
    label: string
    handler: Function
}
interface DataTableProps {
    columns: Array<DataTableColumns>
    dataSource?: Array<object>
    columnClass?: Function
    actions?: Array<DataTableActions>
    showPagination?: boolean
    rowsPerPage?: number
    totalPages?: number
    currentPage?: number
    searchPlaceholder?: string
}
const props = defineProps<DataTableProps>()
const getColumnClass = (row: object, columnKey: string): string => {
    return props.columnClass ? props.columnClass(row, columnKey) : ''
}
const currentSortColumn = ref('')
const currentSortDirection = ref('ascend')
const getActions = computed(() => props.actions || [])
function toggleSorting(column: DataTableColumns) {
    if (column.key === currentSortColumn.value) {
        currentSortDirection.value = currentSortDirection.value === 'ascend' ? 'descend' : 'ascend'
        currentSortColumn.value = column.key
        emit('sortData', column.key, currentSortDirection.value)
    } else {
        currentSortColumn.value = column.key
        currentSortDirection.value = 'ascend'
        emit('sortData', column.key, currentSortDirection.value)
    }
}

</script>

<template>
    <div class="lg:w-[90%] bg-transparent flex flex-col justify-center">
        <DataSearch class="mb-2 self-end" :placeholder="props.searchPlaceholder ? props.searchPlaceholder : ''" />
        <div class="min-w-full rounded-xl overflow-hidden border border-gray-200">
            <table class="min-w-full border-collapse rounded-lg">
                <thead>
                    <tr class="bg-primaryColor text-white font-bold border-gray-200">
                        <th v-for="column in props.columns" :key="column.key" @click="toggleSorting(column)"
                            class="px-4 py-3 text-left cursor-pointer select-none">
                            <div class="flex items-center gap-2">
                                {{ column.label }}
                                <!-- Add sorting indicator -->
                                <span v-if="currentSortColumn === column.key">
                                    <IconSvg :icon="currentSortDirection === 'ascend' ? 'up' : 'down'" color="#ffffff" size="1.5em" />
                                </span>
                            </div>
                        </th>
                        <th v-if="props.actions?.length" class="px-4 py-3 text-center">Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in props.dataSource" :key="rowIndex"
                        class="odd:bg-white even:bg-gray-100">
                        <td v-for="column in props.columns" :key="column.key"
                            :class="[getColumnClass(row, column.key), 'px-4 py-2']">
                            <slot :name="`column-${column.key}`" :row="row" :column="column">
                                {{ row[column.key] }}
                            </slot>
                        </td>
                        <!-- Render Action Buttons -->
                        <td v-if="getActions.length" class="px-4 py-3 text-center flex items-center justify-center">
                            <div v-for="(action, index) in actions" :key="index" @click="action.handler(row)" class="mx-1">
                                <slot :name="`action-${action.key}`">
                                </slot>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>


        </div>
        <!-- Pagination Controls -->
        <div v-if="props.showPagination" class="flex justify-center items-center mt-4 select-none">
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