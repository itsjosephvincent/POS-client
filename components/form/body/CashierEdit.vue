<script setup lang="ts">
import { CashierService } from '~/components/api/CashierService'

const route = useRoute()
const emit = defineEmits(['cashierFetch'])
const userStore = useUserStore()

onMounted(() => {
    fetch()
})

const cashierData = ref(null)
const isFetching = ref(true)

async function fetch() {
    try {
        const role = userStore.getRole.toLowerCase()
        isFetching.value = true
        let params = {}
        const cashierService = new CashierService(role)
        const response = await cashierService.find(route.params.uuid, params)
        isFetching.value = false
        if (response && response.data) {
            console.log(response.data)
            const data = response.data
            cashierData.value = data
            emit('cashierFetch', data)
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
        <FormBodyCashier v-else :is-edit="true" :edit-data="cashierData" />
    </div>
</template>