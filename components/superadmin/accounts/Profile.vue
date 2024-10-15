<script setup lang="ts">
import type { Admin } from '~/common/types';

const route = useRoute();

const props = defineProps<{
    adminData: Admin;
}>();

const infoRowClass = computed(() => 'flex justify-start items-center gap-3');
const statusClass = computed(() =>
    props.adminData.is_active
        ? 'bg-green-400/30 text-successColor px-2 py-1 rounded-lg text-sm text-center'
        : 'bg-orange-400/30 text-warningColor px-2 py-1 rounded-lg text-sm text-center',
);
</script>

<template>
    <div
        class="w-full max-w-lg overflow-y-hidden bg-secondaryBg rounded-xl border border-primaryBorder flex flex-col items-start justify-start gap-2 p-6 text-primaryText"
    >
        <img
            src="/img/user.svg"
            alt=""
            class="rounded-full h-24 w-24 object-cover"
        />
        <div :class="[infoRowClass]">
            <span class="font-light">Name: </span
            ><span class="font-bold"
                >{{ adminData.firstname }} {{ adminData.lastname }}</span
            >
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Username: </span
            ><span class="font-bold">{{ adminData.username }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Status: </span
            ><span :class="['font-bold', statusClass]">{{
                adminData.is_active ? 'Active' : 'Inactive'
            }}</span>
        </div>
        <div :class="[infoRowClass]">
            <span class="font-light">Stores count: </span
            ><span class="font-bold">{{ adminData?.stores?.length || 0 }}</span>
            <span
                ><NuxtLink
                    :to="`/superadmin/accounts/${route.params.uuid}/stores`"
                    class="underline text-secondaryColor"
                    >view all</NuxtLink
                ></span
            >
        </div>
    </div>
</template>
