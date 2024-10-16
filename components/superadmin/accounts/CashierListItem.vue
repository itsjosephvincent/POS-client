<script setup lang="ts">
import type { Cashier } from '~/common/types';

const props = defineProps<{
    cashierData: Cashier;
}>();
</script>

<template>
    <div
        class="bg-white border border-primaryBorder rounded-xl flex justify-start items-center gap-2 p-3 my-2 mx-4"
    >
        <img src="/img/user.svg" alt="" class="w-10 h-10" />
        <div class="font-bold">
            {{ cashierData.name }}
        </div>
    </div>
</template>
