<script setup lang="ts">
import { storeService } from '~/api/admin/StoreService';

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
const route = useRoute();
const userStore = useUserStore();
const pageStore = usePageStore();
const pageTitle = 'Stores';
useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
    initializePageData();
});
async function initializePageData() {
    try {
        let params = {
            admin_id: userStore.getUser.id,
        };
        const response = await storeService.find(
            route.params.uuid.toString(),
            params,
        );
        if (response && response.data) {
            const data = response.data;
            pageStore.setParams([data.store_name + ' ' + data.branch]);
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div></div>
</template>
