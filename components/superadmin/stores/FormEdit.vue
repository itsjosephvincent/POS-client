<script setup lang="ts">
import type { Store, Admin } from '~/common/types';

const prop = defineProps<{
    adminData: Admin | null;
    storeData: Store | null;
}>();
</script>

<template>
    <div class="w-full">
        <LoadingFormSkeleton v-if="!adminData || !storeData" />
        <SuperadminStoresForm
            v-else
            :admin-data="adminData"
            :edit-data="storeData"
        />
    </div>
</template>
