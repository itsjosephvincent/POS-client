<script setup lang="ts">
import { cashierService } from '~/api/store/CashierService';

definePageMeta({
    layout: 'store',
    middleware: ['store'],
});

const userStore = useUserStore();
const pageStore = usePageStore();
const route = useRoute();
const pageTitle = 'Cashiers';
const role = userStore.getRole.toLowerCase();

useHead({
    title: pageTitle,
});
onMounted(() => {
    pageStore.setPage(pageTitle);
    initializePageData();
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});

async function initializePageData() {
    try {
        let params = {};
        const response = await cashierService.find(route.params.uuid, params);
        if (response && response.data) {
            const data = response.data;
            pageStore.setParams([data.name]);
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
