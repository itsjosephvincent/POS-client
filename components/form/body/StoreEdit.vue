<script setup lang="ts">
import { storeService } from '~/components/api/StoreService'

const route = useRoute()
const emit = defineEmits(['storeFetch'])
const userStore = useUserStore()

onMounted(() => {
    fetch()
})

const storeData = ref(null)
const isFetching = ref(true)

async function fetch() {
    try {
        isFetching.value = true
        let params = {
            admin_id: userStore.getUser.id,
        }
        const response = await storeService.store(route.params.uuid, params)
        isFetching.value = false
        if (response && response.data) {
            console.log(response.data)
            const data = response.data
            storeData.value = data
            emit('storeFetch', data)
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
        <LoadingFormSkeleton v-if="isFetching" />
        <FormBodyStore v-else :is-edit="true" :edit-data="storeData" />
    </div>
</template>