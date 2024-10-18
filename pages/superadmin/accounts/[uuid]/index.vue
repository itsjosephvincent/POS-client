<script setup lang="ts">
import type { Admin } from '~/common/types';
import useAdminFetch from '~/components/superadmin/composables/useAdminFetch';
import { useStoreStore } from '~/stores/store';

definePageMeta({
    layout: 'superadmin',
    middleware: ['superadmin'],
});

const route = useRoute();
const pageStore = usePageStore();
const storeStore = useStoreStore();
const pageTitle = 'Accounts';

const isFetching: Ref<boolean> = ref(false);
const adminData: Ref<Admin | null> = ref(null);

useHead({
    title: pageTitle,
});
onMounted(async () => {
    try {
        pageStore.setPage(pageTitle);
        // storeStore.reset();
        isFetching.value = true;
        adminData.value = await useAdminFetch().fetch();
        isFetching.value = false;
        pageStore.setParams([
            `${adminData.value.firstname} ${adminData.value.lastname}`,
        ]);
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
});
onBeforeUnmount(() => {
    pageStore.setParams([]);
});
</script>

<template>
    <div class="w-full max-w-[1000px] h-[600px] px-6 py-4 overflow-hidden">
        <LoadingAccountsViewSkeleton v-if="isFetching" />
        <div
            v-else
            class="w-full h-full bg-white border border-primaryBorder rounded-xl overflow-y-clip flex justify-start overflow-clip"
        >
            <div
                class="w-1/3 max-w-[400px] flex flex-col relative border-r border-primaryBorder"
            >
                <SuperadminAccountsProfileNew
                    v-if="adminData"
                    :admin-data="adminData"
                />
                <div
                    class="font-bold text-lg mx-4 my-2 flex items-center gap-2 cursor-default"
                >
                    <span>Stores</span>
                    <span
                        ><NuxtLink
                            :to="`/superadmin/accounts/${route.params.uuid}/stores`"
                            ><IconSvg
                                icon="expand"
                                size="0.8em"
                                class="text-secondaryColor cursor-pointer" /></NuxtLink
                    ></span>
                </div>
                <!-- Search -->
                <div
                    class="w-[90%] self-center bg-primaryBg rounded-xl border border-primaryBorder flex items-center"
                >
                    <input
                        placeholder="Search Store"
                        class="w-3/4 border-0 grow outline-0 text-secondaryText bg-primaryBg text-sm px-4"
                    />
                    <div
                        class="flex items-center justify-center rounded-full cursor-pointer p-2"
                    >
                        <IconSvg icon="search" size="1.5em" />
                    </div>
                </div>
                <SuperadminAccountsStoresListSection
                    v-if="adminData"
                    :admin-id="adminData.id"
                />
            </div>
            <SuperadminAccountsCashiersListSection
                :store="storeStore.getStore"
            />
        </div>
    </div>
</template>
