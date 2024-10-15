<script setup lang="ts">
import { storeService } from '~/api/superadmin/StoreService';
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const route = useRoute();
const pageStore = usePageStore();
const pageTitle = 'Accounts';
const { adminData } = useAdminFetch();

useHead({
    title: pageTitle,
});

onMounted(() => {
    pageStore.setPage(pageTitle);
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});

watch(adminData, () => {
    if (adminData.value && adminData.value.id) {
        fetchStore();
    }
});

async function fetchStore() {
    try {
        if (!adminData.value) throw 'admin data not fetched.';
        const response = await storeService.find(
            route.params.store_uuid.toString(),
            { admin_id: adminData.value.id },
        );
        pageStore.setParams([
            `${adminData.value.firstname} ${adminData.value.lastname}`,
            'Stores',
            `${response.data.store_name} ${response.data.branch}`,
        ]);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div></div>
</template>
