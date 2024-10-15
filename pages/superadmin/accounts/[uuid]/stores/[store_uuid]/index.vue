<script setup lang="ts">
import { storeService } from '~/api/superadmin/StoreService';
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';
import useStoreFetch from '~/components/superadmin/composables/useStoreFetch';
import type { Admin, Store } from '~/common/types';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const pageStore = usePageStore();
const pageTitle = 'Accounts';
const adminData: Ref<Admin | null> = ref(null);
const storeData: Ref<Store | null> = ref(null);

useHead({
    title: pageTitle,
});

onMounted(async () => {
    pageStore.setPage(pageTitle);
    adminData.value = await useAdminFetch().fetch();
    if (!adminData.value) return;
    storeData.value = await useStoreFetch(adminData.value).fetch();
    pageStore.setParams([
        `${adminData.value.firstname} ${adminData.value.lastname}`,
        'Stores',
        `${storeData.value.store_name} ${storeData.value.branch}`,
    ]);
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
</script>

<template>
    <div></div>
</template>
