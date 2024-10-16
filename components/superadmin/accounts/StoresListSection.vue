<script setup lang="ts">
import { storeService } from '~/api/superadmin/StoreService';
import type { Store } from '~/common/types';

const emit = defineEmits(['storeClick']);
const props = defineProps<{
    adminId: number;
}>();
const stores: Ref<Array<Store> | null> = ref(null);
const isFetching: Ref<Boolean> = ref(false);
const isEmpty: Ref<boolean> = ref(true);

onMounted(() => {
    fetch();
});

async function fetch() {
    try {
        isFetching.value = true;
        const params = { admin_id: props.adminId };
        const response = await storeService.fetch(params);
        isFetching.value = false;
        if (!response.data) throw 'stores data not fetched.';
        stores.value = response.data;
        isEmpty.value = !response.data.length;
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
</script>

<template>
    <div
        class="w-1/2 bg-secondaryBg rounded-xl border border-primaryBorder py-4 text-primaryText"
    >
        <div class="font-bold text-lg mx-4">Stores</div>
        <div class="w-full h-80 overflow-y-auto">
            <LoadingItemListSkeleton v-if="isFetching" />
            <div
                class="w-full h-full flex justify-center items-center text-lg text-secondaryText"
                v-if="!isFetching && isEmpty"
            >
                <span>No stores.</span>
            </div>
            <SuperadminAccountsStoreListItem
                v-else
                v-for="item in stores"
                :key="item.uuid"
                :store-data="item"
            />
        </div>
    </div>
</template>
