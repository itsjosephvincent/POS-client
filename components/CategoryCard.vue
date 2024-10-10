<script setup lang="ts">
import { classificationService } from './api/ClassificationService';

const props = defineProps<{
    classificationData: object
}>()

const emit = defineEmits(['fetchClassifications'])
const showDeleteModal = ref(false)
const itemToDelete = ref({})

function editHandler(uuid: string) {
    navigateTo(`/admin/classifications/${props.classificationData.uuid}/edit`)
}
function deleteHandler(uuid: string) {
    showDeleteModal.value = true
    itemToDelete.value = uuid
}
async function handleDelete() {
    try {
        const uuid: string = props.classificationData.uuid
        closeDeleteModal()
        await classificationService.delete(uuid)
        emit('fetchClassifications')
    } catch(error) {
        console.error(error)
    }
}
function closeDeleteModal() {
    showDeleteModal.value = false
    itemToDelete.value = {}
}

</script>

<template>
    <div :class="['group relative h-36 w-28 md:w-40 p-4 bg-secondaryBg border border-primaryBorder rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer text-primaryColor hover:text-secondaryColor hover:border-secondaryColor']">
        <IconSvg v-if="props.icon" :icon="props.icon" size="2em" />
        <div class="font-bold  select-none">{{ classificationData.name }}</div>
        <div class="absolute top-2 right-2 flex items-center justify-center gap-2">
            <button @click.stop="editHandler(classificationData.uuid)" class="hidden group-hover:block p-1 rounded-full hover:bg-secondaryColorTransparent text-secondaryColor">
                <IconSvg icon="edit" color="secondaryColor" size="1em" />
            </button>
            <button @click.stop="deleteHandler(classificationData.uuid)" class="hidden group-hover:block p-1 rounded-full hover:bg-red-400/20 text-errorColor">
                <IconSvg icon="delete" color="errorColor" size="1em" />
            </button>
        </div>
        <Teleport to="body">
            <ModalDelete :visible="showDeleteModal" @close-delete-modal="closeDeleteModal" @delete-confirmed="handleDelete" >
                <div class="flex items-center gap-4 my-4">
                    <IconSvg icon="error" color="errorColor" size="2em" />
                    <div class="text text-primaryText">Are you sure you want to delete <span class="font-bold">{{ classificationData?.name }}</span>?</div>
                </div>
            </ModalDelete>
        </Teleport>
    </div>
</template>
