<script setup lang="ts">
import type { Store } from '~/common/types';

const props = defineProps<{
    storeData: Store;
}>();
const storeStore = useStoreStore();
const isSelected: Ref<boolean> = ref(false);

watch(
    () => storeStore.getStore,
    (value: Store | null) => {
        if (!value) return (isSelected.value = false);
        isSelected.value = value.uuid === props.storeData.uuid;
    },
);

function handleClick() {
    storeStore.setStore(props.storeData);
}

const selectedClass = computed(() =>
    isSelected.value ? 'bg-secondaryColorTransparent' : 'bg-white',
);
</script>

<template>
    <div
        :class="[
            'rounded-xl flex justify-start items-center gap-2 p-3 my-2 mx-2 select-none cursor-pointer',
            selectedClass,
        ]"
        @click="handleClick"
    >
        <img src="/img/store.svg" alt="" class="h-12 w-12" />
        <div class="flex flex-col items-start justify-center">
            <div class="font-bold">
                {{ storeData.store_name }}
            </div>
            <div class="font-normal">
                {{ storeData.branch }}
            </div>
        </div>
    </div>
</template>
