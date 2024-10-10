<script setup lang="ts">
import { classificationService } from '~/components/api/ClassificationService';

interface ClassificationData {
    name: string
}
const props = defineProps<{
    isEdit?: boolean
    editData?: ClassificationData
}>()
const userStore = useUserStore()

const loading = ref(false)
const errorState = reactive({})

const nameModel = defineModel('name')

onMounted(() => {
    nameModel.value = props.editData?.name || ''
})

function validate() {

}
async function onFormSubmit() {
    try {
        validate()
        loading.value = true
        const params = {
            admin_id: userStore?.getUser?.id,
            name: nameModel.value,
        }
        let response
        if (props.isEdit) {
            response = await classificationService.update(params, props.editData?.uuid)
        } else {
            response = await classificationService.create(params)
        }
        if (response.data) {
            console.log("saved store: ", response.data)
            navigateTo(`/admin/classifications`)
        }
    } catch (error: any) {
        console.log(error)

    }
    loading.value = false
}
const getLoading = computed(() => loading.value)

</script>

<template>
    <div class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl p-6">
        <form @submit.prevent="onFormSubmit" class="w-full">
            <FormTextInput class="my-3" name="name" placeholder="Enter New Classification" label="Classification" :model-value="nameModel" @update:modelValue="$event => (nameModel = $event)"
                bg-class="bg-secondaryBg" border-class="border border-primaryBorder" :error="errorState.username"/>
            <PrimaryButton type="submit" class="w-full my-3" :label="!props.isEdit ? 'Create Classification' : 'Update Classification'" :loading="getLoading" />
        </form>
    </div>
</template>