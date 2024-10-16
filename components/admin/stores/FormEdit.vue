<script setup lang="ts">
import { storeService } from '~/api/admin/StoreService';
import type { Admin, Store } from '~/common/types';

const route = useRoute();
const emit = defineEmits(['storeFetch']);
const userStore = useUserStore();
const user: Admin | null = userStore.getUser;

onMounted(() => {
    fetch();
});

const storeData: Ref<Store | undefined> = ref();
const isFetching = ref(true);

async function fetch() {
    try {
        if (!user) throw 'user store state not set.';
        isFetching.value = true;
        let params = {
            admin_id: user.id,
        };
        const response = await storeService.find(
            route.params.uuid.toString(),
            params,
        );
        isFetching.value = false;
        if (response && response.data) {
            const data = response.data;
            storeData.value = data;
            emit('storeFetch', data);
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
</script>

<template>
    <div class="w-full">
        <LoadingFormSkeleton v-if="isFetching" />
        <AdminStoresForm v-else :is-edit="true" :edit-data="storeData" />
    </div>
</template>
