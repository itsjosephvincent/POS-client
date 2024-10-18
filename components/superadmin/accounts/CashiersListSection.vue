<script setup lang="ts">
import { cashierService } from '~/api/superadmin/CashierService';
import type { Cashier, Store } from '~/common/types';

const route = useRoute();
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
    { immediate: true },
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

const store = computed(() => storeStore.getStore);
</script>

<template>
    <div class="w-full h-full text-primaryText flex flex-col overflow-y-auto">
        <div
            class="w-full p-4 py-2 flex flex-col justify-center border-b border-primaryBorder"
        >
            <div class="font-bold text-lg">{{ store?.store_name }}</div>
            <span
                ><NuxtLink
                    :to="`/superadmin/accounts/${route.params.uuid}/stores/${store?.uuid}`"
                    ><IconSvg
                        icon="expand"
                        size="0.8em"
                        class="text-secondaryColor cursor-pointer" /></NuxtLink
            ></span>
            <div class="font-normal">{{ store?.branch }}</div>
        </div>
        <div class="font-bold p-4 text-lg h-12">Cashiers</div>
        <div class="w-full h-full px-4 flex flex-col">
            <LoadingItemListSkeleton v-if="isFetching" class="mt-10" />
            <div
                class="w-full h-full min-h-96 mt-10 flex justify-center items-start text-lg text-secondaryText"
                v-if="!isFetching && isEmpty"
            >
                <span v-if="!store">Please select a store.</span>
                <span v-else>{{ store.store_name }} has no cashiers.</span>
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
