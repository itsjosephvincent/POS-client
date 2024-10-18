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
    <div class="w-full h-full overflow-y-auto text-primaryText flex flex-col">
        <div
            v-if="isFetching"
            class="mx-2 my-4 flex flex-col justify-center items-start gap-4"
        >
            <div class="animate-pulse w-full h-9 bg-slate-200 rounded-lg"></div>
            <div class="animate-pulse w-full h-9 bg-slate-200 rounded-lg"></div>
        </div>
        <div
            class="w-full flex justify-center items-center text-lg text-secondaryText"
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
</template>
