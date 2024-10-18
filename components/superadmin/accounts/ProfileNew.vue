<script setup lang="ts">
import { adminService } from '~/api/superadmin/AdminService';
import type { Admin } from '~/common/types';

const route = useRoute();
const {
    deleteLoading,
    showDeleteModal,
    clickDelete,
    closeDeleteModal,
    handleDelete,
} = useDeleteModal();

const props = defineProps<{
    adminData: Admin;
}>();

const statusClass = computed(() =>
    props.adminData.is_active
        ? 'bg-green-400/30 text-successColor px-2 py-1 rounded-lg text-sm text-center'
        : 'bg-orange-400/30 text-warningColor px-2 py-1 rounded-lg text-sm text-center',
);

async function onConfirmDelete() {
    await handleDelete(adminService.delete(route.params.uuid.toString()));
    navigateTo(`/superadmin/accounts`);
}

function clickEdit() {
    navigateTo(`/superadmin/accounts/${route.params.uuid}/edit`);
}
</script>

<template>
    <div
        class="w-full bg-secondaryColorTransparent border-bottom border-primaryBorder flex items-center justify-start gap-4 p-4 text-secondaryColor"
    >
        <img
            src="/img/user.svg"
            alt=""
            class="rounded-full h-16 w-16 object-cover"
        />
        <div class="h-full flex flex-col items-start justify-center">
            <div class="font-bold px-1">
                {{ adminData.firstname }} {{ adminData.lastname }}
            </div>
            <div class="font-normal text-sm text-inherit px-1">
                {{ adminData.username }}
            </div>
            <div :class="['font-bold', statusClass]">
                {{ adminData.is_active ? 'Active' : 'Inactive' }}
            </div>
        </div>
        <div class="hidden flex flex-col gap-2 justify-center items-end">
            <button
                @click="clickEdit"
                class="p-1 rounded-full bg-secondaryColor text-white"
            >
                <IconSvg icon="edit" color="white" size="1em" />
            </button>
            <button
                @click="clickDelete"
                class="p-1 rounded-full bg-errorColor text-white"
            >
                <IconSvg icon="delete" color="white" size="1em" />
            </button>
        </div>

        <Teleport to="body">
            <DeleteModal
                :visible="showDeleteModal"
                @close-delete-modal="closeDeleteModal"
                @delete-confirmed="onConfirmDelete"
            >
                <div class="flex items-center gap-4 my-4">
                    <IconSvg icon="error" color="errorColor" />
                    <div class="text text-primaryText">
                        Are you sure you want to delete account
                        <span class="font-bold"
                            >{{ adminData.firstname }}
                            {{ adminData.lastname }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </div>
</template>
