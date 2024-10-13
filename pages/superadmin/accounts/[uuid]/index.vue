<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
})

const pageStore = usePageStore()
const route = useRoute()
const pageTitle = 'Accounts'

const adminData = ref(null)

useHead({
    title: pageTitle,
})
onMounted(() => {
    pageStore.setPage(pageTitle)
    initializePageData()
})
onBeforeUnmount(() => {
    pageStore.setParams([])
})

async function initializePageData() {
    try {
        let params = {}
        const response = await adminService.find(route.params.uuid, params)
        if (response && response.data) {
            console.log(response)
            const data = response.data
            adminData.value = response.data
            console.log(data.value)
            pageStore.setParams([`${data.firstname} ${data.lastname}`])
        } else {
            throw 'Empty data.'
        }

    } catch (error) {
        console.error(error)
    }
}

const adminId = computed(() => adminData.value?.id)
const storesCount = computed(() => adminData.value?.stores?.length || 0)

</script>

<template>
    <div class="w-full px-6">
        <ReportInfoSummaryCard v-if="adminData" title="Stores" :summary="storesCount.toString()" icon="warehouse" />
    </div>
</template>