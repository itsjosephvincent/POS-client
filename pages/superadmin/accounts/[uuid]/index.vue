<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService';
import type { Admin } from '~/common/types';
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const pageStore = usePageStore();
const route = useRoute();
const pageTitle = 'Accounts';

const adminData: Ref<Admin | null> = ref(null);

useHead({
    title: pageTitle,
});
onMounted(async () => {
    try {
        pageStore.setPage(pageTitle);
        adminData.value = await useAdminFetch().fetch();
        pageStore.setParams([
            `${adminData.value.firstname} ${adminData.value.lastname}`,
        ]);
    } catch (error) {
        console.error(error);
    }
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});

const adminId = computed(() => adminData.value?.id);
const storesCount = computed(() => adminData.value?.stores?.length || 0);
</script>

<template>
    <div class="w-full px-6 py-4">
        <SuperadminAccountsProfileNew
            v-if="adminData"
            :admin-data="adminData"
        />
        <div class="flex justify-start items-center gap-2 my-2">
            <SuperadminAccountsStoresListSection />
            <SuperadminAccountsCashiersListSection />
        </div>
    </div>
</template>
