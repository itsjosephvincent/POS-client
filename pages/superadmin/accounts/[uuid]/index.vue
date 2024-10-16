<script setup lang="ts">
import type { Admin } from '~/common/types';
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';
import { useStoreStore } from '~/stores/store';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const pageStore = usePageStore();
const storeStore = useStoreStore();
const pageTitle = 'Accounts';

const adminData: Ref<Admin | null> = ref(null);

useHead({
    title: pageTitle,
});
onMounted(async () => {
    try {
        pageStore.setPage(pageTitle);
        storeStore.reset();
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
</script>

<template>
    <div class="w-full px-6 py-4">
        <SuperadminAccountsProfileNew
            v-if="adminData"
            :admin-data="adminData"
        />
        <div class="flex justify-start items-start gap-2 my-2">
            <SuperadminAccountsStoresListSection
                v-if="adminData"
                :admin-id="adminData.id"
            />
            <SuperadminAccountsCashiersListSection
                :store="storeStore.getStore"
            />
        </div>
    </div>
</template>
