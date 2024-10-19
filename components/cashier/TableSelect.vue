<script setup lang="ts">
import { tableService } from '~/api/cashier/TableService';
import type { Cashier, Table } from '~/common/types';

const userStore = useUserStore();
const user: Cashier | null = userStore.getUser;

const tables: Ref<Array<Table> | null> = ref(null);

onMounted(() => {
    fetch();
});
async function fetch() {
    try {
        const params = {
            store_id: user?.store.id,
        };
        const response = await tableService.fetch(params);
        if (!response.data) throw 'Unable to fetch tables.';
        tables.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

const tableOptions = computed(() => {
    if (tables.value) {
        return tables.value.map((i: Table) => {
            return { key: i.uuid, value: i.uuid, label: i.name };
        });
    }
    return null;
});
</script>

<template>
    <div class="p-2">
        <FormSelect
            v-if="tables"
            :options="tableOptions"
            label="Table"
            placeholder="Select Table"
            name="table"
            class="p-0"
        />
    </div>
</template>
