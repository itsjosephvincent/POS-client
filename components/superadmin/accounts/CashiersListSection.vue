<script setup lang="ts">
import { cashierService } from '~/api/superadmin/CashierService';
import type { Cashier, Store } from '~/common/types';

const storeStore = useStoreStore();
const cashiers: Ref<Array<Cashier> | null> = ref(null);
const isFetching: Ref<boolean> = ref(false);
const isEmpty: Ref<boolean> = ref(true);

watch(
    () => storeStore.getStore,
    (value) => {
        if (!value) return;
        fetch();
    },
);
async function fetch() {
    try {
        const storeData: Store | null = storeStore.getStore;
        if (!storeData) throw 'Store is null.';
        isFetching.value = true;

        const params = { store_id: storeData.id };
        const response = await cashierService.fetch(params);
        isFetching.value = false;
        if (!response.data) throw 'error fetching cashiers.';
        cashiers.value = response.data;
        isEmpty.value = !response.data.length;
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
</script>

<template>
    <div
        class="w-1/2 bg-secondaryBg rounded-xl border border-primaryBorder p-4 text-primaryText"
    >
        <div class="font-bold text-lg">Cashiers</div>
        <div class="w-full h-80 overflow-y-auto">
            <LoadingItemListSkeleton v-if="isFetching" />
            <div
                class="w-full h-full flex justify-center items-center text-lg text-secondaryText"
                v-if="!isFetching && isEmpty"
            >
                <span v-if="!storeStore.getStore">Please select a store.</span>
                <span v-else
                    >{{ storeStore.getStore.store_name }} has no cashiers.</span
                >
            </div>
            <SuperadminAccountsCashierListItem
                v-if="!isFetching && !isEmpty"
                v-for="item in cashiers"
                :key="item.uuid"
                :cashier-data="item"
            />
        </div>
    </div>
</template>
