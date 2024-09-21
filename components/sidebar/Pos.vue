<script setup lang="ts">
import { computed } from 'vue'
import { black } from '~/constants/colors';

const iconStyle = computed(() => "cursor-pointer hover:bg-slate-200 rounded-full p-2")
</script>

<template>
    <div class="md:flex md:flex-col md:items-center md:gap-4 w-full">
        <IconCashRegister :color="black" :class="iconStyle" /> 
        <IconOrders :color="black" :class="iconStyle" />
        <IconTransactions :color="black" :class="iconStyle" />
        <IconCashDrawer :color="black" :class="iconStyle" />
        <IconStaff :color="black" :class="iconStyle" />
        <IconItems :color="black" :class="iconStyle" />
        <IconInventory :color="black" :class="iconStyle" />
        <IconReporting :color="black" :class="iconStyle" />
        <IconSettings :color="black" :class="iconStyle" />
    </div>
</template>
