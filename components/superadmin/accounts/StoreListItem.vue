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
    isSelected.value ? 'border-2 border-secondaryColor' : '',
);
</script>

<template>
    <div
        :class="[
            'bg-white border border-primaryBorder rounded-xl flex justify-start items-center gap-2 p-3 my-2 mx-4 select-none cursor-pointer',
            selectedClass,
        ]"
        @click="handleClick"
    >
        <IconSvg icon="store" size="3em" class="text-gray-700" />
        <div class="font-bold">
            {{ storeData.store_name }} {{ storeData.branch }}
        </div>
    </div>
</template>
