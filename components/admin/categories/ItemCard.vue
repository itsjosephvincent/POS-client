<script setup lang="ts">
import { categoryService } from '~/api/admin/CategoryService';
import type { Category } from '~/common/types';

const props = defineProps<{
    categoryData: Category;
}>();

const emit = defineEmits(['fetchCategories']);
const showDeleteModal = ref(false);
const itemToDelete = ref({});

function editHandler(uuid: string) {
    navigateTo(`/admin/categories/${props.categoryData.uuid}/edit`);
}
function deleteHandler(uuid: string) {
    showDeleteModal.value = true;
    itemToDelete.value = uuid;
}
async function handleDelete() {
    try {
        const uuid: string = props.categoryData.uuid;
        closeDeleteModal();
        await categoryService.delete(uuid);
        emit('fetchCategories');
    } catch (error) {
        console.error(error);
    }
}
function closeDeleteModal() {
    showDeleteModal.value = false;
    itemToDelete.value = {};
}
</script>

<template>
    <div
        :class="[
            'group relative h-36 w-40 p-4 bg-secondaryBg border border-primaryBorder rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer text-primaryColor hover:text-secondaryColor hover:border-secondaryColor',
        ]"
    >
        <IconSvg v-if="props.icon" :icon="props.icon" size="2em" />
        <div class="font-bold select-none">{{ categoryData.name }}</div>
        <div
            class="absolute top-2 right-2 flex items-center justify-center gap-2"
        >
            <button
                @click.stop="editHandler(categoryData.uuid)"
                class="hidden group-hover:block p-1 rounded-full hover:bg-secondaryColorTransparent text-secondaryColor"
            >
                <IconSvg icon="edit" color="secondaryColor" size="1em" />
            </button>
            <button
                @click.stop="deleteHandler(categoryData.uuid)"
                class="hidden group-hover:block p-1 rounded-full hover:bg-red-400/20 text-errorColor"
            >
                <IconSvg icon="delete" color="errorColor" size="1em" />
            </button>
        </div>
        <Teleport to="body">
            <DeleteModal
                :visible="showDeleteModal"
                @close-delete-modal="closeDeleteModal"
                @delete-confirmed="handleDelete"
            >
                <div class="flex items-center gap-4 my-4">
                    <IconSvg icon="error" color="errorColor" size="2em" />
                    <div class="text text-primaryText">
                        Are you sure you want to delete
                        <span class="font-bold">{{ categoryData?.name }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </div>
</template>
