<script setup lang="ts">
import { tableService } from '~/api/store/TableService';
import type { Table } from '~/common/types';

const pageTitle = 'Tables';
const pageStore = usePageStore();
definePageMeta({
    layout: 'store',
    middleware: ['store'],
});
useHead({
    title: pageTitle,
});

const tablesData: Ref<Array<Table> | null> = ref(null);
const isFetching: Ref<boolean> = ref(false);
const isEmpty: Ref<boolean> = ref(false);

onMounted(() => {
    pageStore.setPage(pageTitle);
    pageStore.setParams([]);
    fetch();
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
async function fetch() {
    try {
        isFetching.value = true;
        const params = {};
        const response = await tableService.fetch(params);
        isFetching.value = false;
        if (!response.data) throw 'Error fetching data.';
        tablesData.value = response.data;
        isEmpty.value = !response.data.length;
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
function onAddNew() {
    navigateTo('/store/tables/new');
}
</script>

<template>
    <div class="w-full px-6">
        <LoadingCategoryListSkeleton v-if="isFetching" />
        <div v-else class="w-full flex flex-col items-start">
            <PrimaryButton
                class="mb-6"
                label="New Table"
                icon="plus"
                @click="onAddNew"
            />
            <div v-if="isEmpty" class="m-2">No tables added.</div>
            <div
                v-else
                class="w-full flex items-center justify-start flex-wrap gap-4"
            >
                <StoreTablesItemCard
                    v-for="item in tablesData"
                    :key="item.uuid"
                    :table="item"
                    @fetch-tables="fetch"
                />
            </div>
        </div>
    </div>
</template>
