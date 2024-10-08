<script setup lang="ts">
import { reactive } from 'vue';
import { black } from '~/constants/colors';

const state = reactive({
    user: {
        name: 'John Doe',
        username: 'j.doe123',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
    }
})

</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-full xl:mx-6 my-2 p-4 flex items-center gap-4 xl:rounded-xl bg-secondaryBg xl:border border-slate-200">
            <img :alt="state.user.name" :src="state.user.avatar" class="object-contain rounded-xl" height="50" width="50" />
            <div class="grow flex flex-col justify-center items-start">
                <div class="text-xs text-secondaryText font-bold">Cashier Today!</div>
                <div class="text-lg font-bold text-primaryText">{{ state.user.name }}</div>
            </div>
            <IconSvg icon="bell" />
        </div>
    </div>
    
</template>