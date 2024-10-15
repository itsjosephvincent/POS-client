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

const infoRowClass = computed(() => 'flex justify-start items-center gap-3');
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
        class="w-full max-w-lg overflow-y-hidden bg-secondaryBg rounded-xl border border-primaryBorder flex flex-col items-start justify-start gap-2 p-6 text-primaryText"
    >
        <img
            src="/img/user.svg"
            alt=""
            class="rounded-full h-24 w-24 object-cover"
        />
        <div :class="[infoRowClass]">
            <span class="font-light">Name: </span
            ><span class="font-bold"
                >{{ adminData.firstname }} {{ adminData.lastname }}</span
            >
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Username: </span
            ><span class="font-bold">{{ adminData.username }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Status: </span
            ><span :class="['font-bold', statusClass]">{{
                adminData.is_active ? 'Active' : 'Inactive'
            }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Stores count: </span
            ><span class="font-bold">{{ adminData?.stores?.length || 0 }}</span>
            <span
                ><NuxtLink
                    :to="`/superadmin/accounts/${route.params.uuid}/stores`"
                    class="underline text-secondaryColor"
                    >view all</NuxtLink
                ></span
            >
        </div>
        <div class="w-full flex flex-col md:flex-row gap-2 mt-4">
            <PrimaryButton
                @click="clickEdit"
                label="Edit"
                class="w-full h-[38px]"
            />
            <PrimaryButton
                :loading="deleteLoading"
                @click="clickDelete"
                label="Delete"
                custom-class="bg-errorColor text-white"
                class="w-full h-[38px]"
            />
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
