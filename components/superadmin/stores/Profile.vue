<script setup lang="ts">
import type { Store } from '~/common/types';
import { StoreService } from '~/api/superadmin/StoreService';
import { storeService } from '~/api/admin/StoreService';

const route = useRoute();
const {
    deleteLoading,
    showDeleteModal,
    clickDelete,
    closeDeleteModal,
    handleDelete,
} = useDeleteModal();
const props = defineProps<{
    storeData: Store | null;
}>();

async function onConfirmDelete() {
    await handleDelete(storeService.delete(route.params.store_uuid.toString()));
    navigateTo(`/superadmin/accounts/${route.params.uuid}/stores`);
}

function clickEdit() {
    navigateTo(
        `/superadmin/accounts/${route.params.uuid}/stores/${route.params.store_uuid}/edit`,
    );
}

const infoRowClass = computed(() => 'flex justify-start items-center gap-3');
</script>

<template>
    <LoadingCardSkeleton v-if="!storeData" />
    <ProfileCard v-else>
        <img
            src="/img/user.svg"
            alt=""
            class="rounded-full h-24 w-24 object-cover"
        />
        <div :class="[infoRowClass]">
            <span class="font-light">Store: </span
            ><span class="font-bold">{{ storeData.store_name }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Branch: </span
            ><span class="font-bold">{{ storeData.branch }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Username: </span
            ><span class="font-bold">{{ storeData.username }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Cashiers: </span
            ><span class="font-bold">1</span>
            <span
                ><NuxtLink
                    :to="`/superadmin/accounts/${route.params.uuid}/stores/${route.params.store_uuid}/cashiers`"
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
                            >{{ storeData.store_name }}
                            {{ storeData.branch }}</span
                        >?
                    </div>
                </div>
            </DeleteModal>
        </Teleport>
    </ProfileCard>
</template>
