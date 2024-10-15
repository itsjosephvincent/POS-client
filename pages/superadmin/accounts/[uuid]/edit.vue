<script setup lang="ts">
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const pageStore = usePageStore();
const pageTitle = 'Accounts';
useHead({
    title: pageTitle,
});

const { adminData } = useAdminFetch();
onMounted(() => {
    pageStore.setPage(pageTitle);
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
</script>

<template>
    <div class="w-full px-6">
        <SuperadminAccountsFormEdit :admin-data="adminData" />
    </div>
</template>
