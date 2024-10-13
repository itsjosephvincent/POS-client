<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService'

const route = useRoute()
const emit = defineEmits(['accountFetch'])

onMounted(() => {
    fetch()
})

const accountData = ref(null)
const isFetching = ref(true)

async function fetch() {
    try {
        isFetching.value = true
        let params = {}
        const response = await adminService.find(route.params.uuid, params)
        isFetching.value = false
        if (response && response.data) {
            console.log(response.data)
            const data = response.data
            accountData.value = data
            emit('accountFetch', data)
        } else {
            throw 'Empty data.'
        }

    } catch (error) {
        isFetching.value = false
        console.error(error)
    }
}

</script>

<template>
    <div class="w-full">
        <div v-if="isFetching" class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6">
            <LoadingProductSkeleton />
        </div>
        <SuperadminAccountsForm v-else :is-edit="true" :edit-data="accountData" />
    </div>
</template>