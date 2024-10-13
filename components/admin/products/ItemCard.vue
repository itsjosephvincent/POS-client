<script setup lang="ts">
import { productService } from '~/api/admin/ProductService';

const props = defineProps<{
    uuid: string;
    name: string;
    cost: string;
    price: string;
    inventory: number;
    image?: string;
}>();
const deleteLoading = ref(false);
const showDeleteModal = ref(false);

function clickEdit() {
    navigateTo(`/admin/skus/${props.uuid}/edit`);
}
function clickDelete() {
    showDeleteModal.value = true;
}
function closeDeleteModal() {
    showDeleteModal.value = false;
}
async function handleDelete() {
    try {
        closeDeleteModal();
        deleteLoading.value = true;
        const response = await productService.delete(props.uuid);
        deleteLoading.value = false;
        navigateTo('/admin/skus');
    } catch (error) {
        deleteLoading.value = false;
        console.error(error);
    }
}
const getDeleteLoading = computed(() => !!deleteLoading.value);
const getShowDeleteModal = computed(() => !!showDeleteModal.value);
</script>

<template>
    <div
        class="w-full max-w-lg lg:w-[500px] p-6 bg-secondaryBg lg:border lg:border-primaryBorder lg:rounded-xl flex flex-col md:flex md:flex-row justify-center items-center gap-4 cursor-pointer text-primaryColor"
    >
        <img
            v-if="props.image"
            :src="props.image"
            alt="product image"
            class="w-[200px] object-cover rounded-xl"
        />
        <img
            v-else
            src="~/assets/img/noimg_medium.png"
            alt="product image"
            class="w-[200px] object-cover rounded-xl"
        />
        <div class="w-full flex flex-col items-start grow">
            <div class="font-bold select-none text-xl">{{ props.name }}</div>
            <div class="font-bold text-primaryText">
                <span class="pr-2 font-medium text-secondaryText">Cost</span
                >{{ props.cost }}
            </div>
            <div class="font-bold text-primaryText">
                <span class="pr-2 font-medium text-secondaryText">Price</span
                >{{ props.price }}
            </div>
            <div class="font-bold text-primaryText">
                <span class="pr-2 font-medium text-secondaryText">In stock</span
                >{{ props.inventory }}
            </div>
            <div class="w-full flex flex-col md:flex-row gap-2 mt-4">
                <PrimaryButton
                    @click="clickEdit"
                    label="Edit"
                    class="w-full h-[38px]"
                />
                <PrimaryButton
                    :loading="getDeleteLoading"
                    @click="clickDelete"
                    label="Delete"
                    custom-class="bg-errorColor text-white"
                    class="w-full h-[38px]"
                />
            </div>

            <Teleport to="body">
                <DeleteModal
                    :visible="getShowDeleteModal"
                    @close-delete-modal="closeDeleteModal"
                    @delete-confirmed="handleDelete"
                >
                    <div class="flex items-center gap-4 my-4">
                        <IconSvg icon="error" color="errorColor" />
                        <div class="text text-primaryText">
                            Are you sure you want to delete
                            <span class="font-bold">{{
                                props.name || 'this product'
                            }}</span
                            >?
                        </div>
                    </div>
                </DeleteModal>
            </Teleport>
        </div>
    </div>
</template>
