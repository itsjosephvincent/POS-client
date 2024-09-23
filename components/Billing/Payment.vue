<script setup lang="ts">
    import { gray } from '~/constants/colors';
</script>

<template>
    <div class="mx-2 xl:mx-6 mb-4 flex flex-col gap-4">
        <div class="font-bold text-lg text-primaryText">Payment Method</div>
        <div class="flex gap-6 justify-start">
            <div class="p-4 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-400">
                <IconSvg icon="cash" :color="gray" />
            </div>
            <div class="p-4 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-400">
                <IconSvg icon="creditCard" :color="gray" />
            </div>
        </div>
        <button type="button" class="p-2 rounded-lg bg-primaryColor text-white font-bold text-lg">Print Bills</button>
    </div>
</template>