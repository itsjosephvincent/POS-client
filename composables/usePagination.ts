export default function () {
    const rowsPerPage: Ref<number> = ref(10);
    const totalPages: Ref<number> = ref(0);
    const currentPage: Ref<number> = ref(1);
    const sortField: Ref<string> = ref('');
    const sortOrder: Ref<string> = ref('ascend');
    const filter: Ref<string> = ref('');

    const getRowsPerPage = computed(() => rowsPerPage.value || 10);
    const getTotalPages = computed(() => totalPages.value);
    const getCurrentPage = computed(() => currentPage.value);

    function filterData(value: string, callback: Function) {
        filter.value = value;
        callback();
    }
    function previousPageClick(callback: Function) {
        currentPage.value -= 1;
        callback();
    }
    function nextPageClick(callback: Function) {
        currentPage.value += 1;
        callback();
    }
    function goToPage(page: number, callback: Function) {
        currentPage.value = page;
        callback();
    }

    return {
        rowsPerPage,
        totalPages,
        currentPage,
        sortField,
        sortOrder,
        filter,
        getRowsPerPage,
        getTotalPages,
        getCurrentPage,
        filterData,
        previousPageClick,
        nextPageClick,
        goToPage,
    };
}
