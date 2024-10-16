<script setup lang="ts">
import type { Admin } from '~/common/types';
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

const route = useRoute();

const adminData: Ref<Admin | null> = ref(null);

onMounted(async () => {
    try {
        pageStore.setPage(pageTitle);
        adminData.value = await useAdminFetch().fetch();
        pageStore.setParams([
            `${adminData.value.firstname} ${adminData.value.lastname}`,
            'Stores',
            'New Store',
        ]);
    } catch (error) {
        console.error(error);
    }
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
</script>

<template>
    <div class="w-full px-6">
        <SuperadminStoresForm v-if="adminData" :admin-data="adminData" />
    </div>
</template>
