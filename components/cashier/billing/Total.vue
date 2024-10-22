<script setup lang="ts">
const runningBillStore = useRunningBillStore();
onMounted(() => {});
</script>

<template>
    <div class="xl:mx-6">
        <div class="p-2 mt-2 flex justify-between font-bold text-primaryText">
            <div class="">Subtotal</div>
            <div class="">P{{ runningBillStore.getTotal.toFixed(2) }}</div>
        </div>
        <div
            class="p-2 mt-1 flex justify-between font-bold text-sm text-tertiaryText"
        >
            <div class="">Tax (10%)</div>
            <div class="">
                P{{ (runningBillStore.getTotal * 0.12).toFixed(2) }}
            </div>
        </div>
        <div
            class="m-2 border-b-2 border-dashed border-tertiaryText mt-4"
        ></div>
        <div class="p-2 mt-4 flex justify-between font-bold text-primaryText">
            <div class="">Total</div>
            <div class="">
                P{{
                    (
                        runningBillStore.getTotal +
                        runningBillStore.getTotal * 0.1
                    ).toFixed(2)
                }}
            </div>
        </div>
    </div>
</template>
