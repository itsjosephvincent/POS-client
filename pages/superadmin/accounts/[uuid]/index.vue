<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService';
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const pageStore = usePageStore();
const route = useRoute();
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

const adminId = computed(() => adminData.value?.id);
const storesCount = computed(() => adminData.value?.stores?.length || 0);
</script>

<template>
    <div class="w-full px-6 py-4">
        <SuperadminAccountsProfile v-if="adminData" :admin-data="adminData" />
    </div>
</template>
