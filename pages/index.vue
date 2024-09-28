<script setup lang="ts">
import { coffee } from '~/test-data/coffee.js'
import { useUserStore } from '~/stores/user.js'
import { useSetPage } from '~/composables/usePage.ts'

definePageMeta({
    middleware: ['auth'],
})
const userStore = useUserStore()
const page = useSetPage()
</script>

<template>
        <div class="flex justify-center h-[calc(100%-152px)] w-full">
            <div v-if="userStore.getRole === 'SuperAdmin'"
                class="overflow-y-auto p-4 pb-4 flex flex-col grow sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start">
                <h1>Super Admin</h1>
            </div>
            <div v-if="userStore.getRole === 'Cashier'"
                class="overflow-y-auto p-4 pb-4 flex flex-col grow sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start">
                <PosItemCards v-for="item in coffee" :key="item.id" :item="item.title" :description="item.description"
                    :image-src="item.image" />
            </div>
        </div>
</template>
