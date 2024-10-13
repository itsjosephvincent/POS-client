<script setup lang="ts">
const isPaymentMethod = ref(false);
</script>

<template>
    <div class="mx-2 xl:mx-6 mb-4 flex flex-col gap-4">
        <div v-if="isPaymentMethod" class="font-bold text-lg text-primaryText">
            Payment Method
        </div>
        <div v-if="isPaymentMethod" class="flex gap-6 justify-start">
            <div
                class="p-4 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-400"
            >
                <IconSvg icon="cash" />
            </div>
            <div
                class="p-4 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-400"
            >
                <IconSvg icon="creditCard" />
            </div>
        </div>
        <button
            type="button"
            class="p-2 rounded-lg bg-primaryColor text-white font-bold text-lg"
        >
            Process Transaction
        </button>
    </div>
</template>
