<script setup lang="ts">
import * as yup from 'yup';
import { cartService } from '~/api/cashier/CartService';
import { runningBillService } from '~/api/cashier/RunningBillService';
import { TransactionMode, type BillingProduct } from '~/common/types';

const transactionStore = useTransactionStore();
const runningBillStore = useRunningBillStore();
const cartStore = useCartStore();
const {
    deleteLoading,
    showDeleteModal,
    clickDelete,
    closeDeleteModal,
    handleDelete,
} = useDeleteModal();

const itemToVoid: Ref<BillingProduct | null> = ref(null);
const { values, errors, meta, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        password: yup.string().required('Store Password is required'),
    }),
});
const [password] = defineField('password');

function handleVoidClick(item: BillingProduct) {
    resetForm();
    itemToVoid.value = item;
    clickDelete();
}
async function onVoidItem() {
    try {
        if (!itemToVoid.value) throw 'No item to void.';
        const uuid: string = itemToVoid.value.uuid;
        const params = {
            password: password.value,
        };
        const response =
            transactionStore.getMode === TransactionMode.RunningBill
                ? await runningBillService.void(params, uuid)
                : await cartService.void(params, uuid);
        if (!response.data) throw 'Error on void process.';
        closeDeleteModal();
    } catch (error) {
        console.error(error);
    }
}

const billedItems = computed(() =>
    transactionStore.getMode === TransactionMode.Cart
        ? cartStore.getProducts
        : runningBillStore.getProducts,
);
</script>

<template>
    <div class="w-full min-h-[calc(100vh-416px)] overflow-y-auto">
        <div
            v-if="billedItems && billedItems.length"
            v-for="item in billedItems"
            :class="[
                'px-4 py-2 flex justify-between items-center text-primaryText gap-2',
                item.is_voided ? 'opacity-50' : 'opacity-100',
            ]"
        >
            <div class="flex justify-start items-center gap-2">
                <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-11 h-11 rounded-xl object-cover"
                />
                <div class="font-bold w-48">{{ item.name }}</div>
            </div>
            <div class="w-32 text-wrap break-words">
                <div class="font-medium text-secondaryText text-xs text-right">
                    {{ item.quantity }} x {{ item.price }}
                </div>
                <div class="font-bold text-right">
                    {{ (item.price * item.quantity).toFixed(2) }}
                </div>
            </div>
            <button
                :class="[
                    'rounded-full p-2',
                    item.is_voided ? 'invisible' : 'visible',
                ]"
                @click="handleVoidClick(item)"
            >
                <IconSvg icon="delete" color="errorColor" size="1.3em" />
            </button>
        </div>
        <Teleport to="body">
            <CashierBillingVoidModal
                :visible="showDeleteModal"
                @close-delete-modal="closeDeleteModal"
                @delete-confirmed="onVoidItem"
            >
                <div class="flex flex-col items-center my-4">
                    <div class="flex items-center gap-4 my-4">
                        <IconSvg icon="error" color="errorColor" size="1.5em" />
                        <div class="text text-primaryText">
                            Are you sure you want to void
                            <span class="font-bold">{{
                                itemToVoid?.name
                            }}</span>
                            from the order?
                        </div>
                    </div>
                    <FormTextInput
                        name="password"
                        placeholder="Store Password"
                        type="password"
                        v-model="password"
                        :error="errors.password"
                    />
                </div>
            </CashierBillingVoidModal>
        </Teleport>
    </div>
</template>
