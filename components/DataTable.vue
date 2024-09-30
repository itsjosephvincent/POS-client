<script setup lang="ts">

const emit = defineEmits(['sortData'])
interface DataTableColumns {
    key: string
    label: string
}
interface DataTableProps {
    columns: Array<DataTableColumns>
    dataSource?: Array<object>
    columnClass?: Function
    actions?: Array<object>
    showPagination?: boolean
    rowsPerPage?: number
    totalPages?: number
    currentPage?: number
}
const props = defineProps<DataTableProps>()
const getColumnClass = (row: object, columnKey: string): string => {
    return props.columnClass ? props.columnClass(row, columnKey) : ''
}
const currentSortColumn = ref(null)
const currentSortDirection = ref('asc')
const getActions = computed(() => props.actions || [])
function toggleSorting(column: DataTableColumns) {
    if (column.key === currentSortColumn.value) {
        currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc'
        currentSortColumn.value = column.key
        emit('sortData', column.key, currentSortDirection.value)
    } else {
        currentSortColumn.value = column.key
        emit('sortData', column.key, currentSortDirection.value)
    }
}

</script>

<template>
    <div class="lg:w-[90%] bg-transparent flex flex-col justify-center">
        <div class="min-w-full rounded-xl overflow-hidden border border-gray-200">
            <table class="min-w-full border-collapse rounded-lg">
                <thead>
                    <tr class="bg-primaryColor text-white font-bold border-gray-200">
                        <th v-for="column in props.columns" :key="column.key" @click="toggleSorting(column)"
                            class="px-4 py-4 text-left">{{ column.label }}
                            <!-- Add sorting indicator -->
                            <span v-if="currentSortColumn === column.key">
                                {{ currentSortDirection === 'asc' ? '▲' : '▼' }}
                            </span>
                        </th>
                        <th v-if="props.actions?.length" class="px-4 py-4 text-center">Actions
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
                        <td v-if="getActions.length" class="px-4 py-4 text-center">
                            <button v-for="(action, index) in actions" :key="index" @click="action.handler(row)"
                                class="mx-1 px-4 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-700">
                                {{ action.label }}
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>


        </div>
        <!-- Pagination Controls -->
        <div v-if="props.showPagination" class="flex justify-center items-center mt-4">
            <button :disabled="props.currentPage === 1" @click="$emit('previousPage')"
                class="px-4 py-2 disabled:text-gray-500">
                Previous
            </button>
            <button v-for="page in totalPages" :key="page" @click="$emit('goToPage', page)" :class="[
                'px-4 py-2',
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400',
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