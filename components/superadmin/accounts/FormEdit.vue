<script setup lang="ts">
import type { Admin } from '~/common/types';

const props = defineProps<{
    adminData: Admin | null;
}>();
</script>

<template>
    <div class="w-full">
        <div
            v-if="!adminData"
            class="w-full bg-secondaryBg lg:border lg:border-primaryBorder rounded-xl lg:p-6"
        >
            <LoadingFormSkeleton />
        </div>
        <SuperadminAccountsForm v-else :edit-data="adminData" />
    </div>
</template>
