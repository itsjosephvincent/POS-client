<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService';
import type { Admin } from '~/common/types';

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

const adminData: Ref<Admin | undefined> = ref();

async function fetchAdmin() {
    try {
        const params = {};
        const response = await adminService.find(
            route.params.uuid.toString(),
            params,
        );
        if (!response.data) throw 'Error fetching data.';
        adminData.value = response.data;
        pageStore.setParams([
            `${adminData.value?.firstname} ${adminData.value?.lastname}`,
            'Stores',
        ]);
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    pageStore.setPage(pageTitle);
    fetchAdmin();
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});

const adminId = computed(() => (adminData.value ? adminData.value.id : null));
</script>

<template>
    <div class="w-full px-6">
        <SuperadminStoresTable v-if="adminId" :admin-id="adminId" />
    </div>
</template>
