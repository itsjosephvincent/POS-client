<script setup lang="ts">
import { tableService } from '~/api/store/TableService';
import type { Table } from '~/common/types';

const pageTitle = 'Tables';
const pageStore = usePageStore();
const route = useRoute();
definePageMeta({
    layout: 'store',
    middleware: ['store'],
});
useHead({
    title: pageTitle,
});

const tableData: Ref<Table | null> = ref(null);

onMounted(() => {
    pageStore.setPage(pageTitle);
    fetch();
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
async function fetch() {
    try {
        const params = {};
        const response = await tableService.find(
            route.params.uuid.toString(),
            params,
        );
        if (!response.data) throw 'Unable to fetch Table data.';
        tableData.value = response.data;
        pageStore.setParams([response.data.name, 'Edit Table']);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="w-full px-6">
        <StoreTablesForm v-if="tableData" :edit-data="tableData" />
    </div>
</template>
