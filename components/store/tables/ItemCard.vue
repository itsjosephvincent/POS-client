<script setup lang="ts">
import { tableService } from '~/api/store/TableService';
import type { Table } from '~/common/types';

const props = defineProps<{
    table: Table;
}>();

const emit = defineEmits(['fetchTables']);
const showDeleteModal = ref(false);
const itemToDelete = ref({});

function editHandler(uuid: string) {
    navigateTo(`/store/tables/${props.table.uuid}/edit`);
}
function deleteHandler(uuid: string) {
    showDeleteModal.value = true;
    itemToDelete.value = uuid;
}
async function handleDelete() {
    try {
        const uuid: string = props.table.uuid;
        closeDeleteModal();
        await tableService.delete(uuid);
        emit('fetchTables');
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
            'group relative h-36 w-28 md:w-40 p-4 bg-secondaryBg border border-primaryBorder rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer text-primaryColor hover:text-secondaryColor hover:border-secondaryColor',
        ]"
    >
        <div class="font-bold select-none text-wrap text-center">
            {{ table.name }}
        </div>

        <div
            class="absolute top-2 right-2 flex items-center justify-center gap-2"
        >
            <button
                @click.stop="editHandler(table.uuid)"
                class="hidden group-hover:block p-1 rounded-full hover:bg-secondaryColorTransparent text-secondaryColor"
            >
                <IconSvg icon="edit" color="secondaryColor" size="1em" />
            </button>
            <button
                @click.stop="deleteHandler(table.uuid)"
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
                        <span class="font-bold">{{ table?.name }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </div>
</template>
