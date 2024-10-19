<script setup lang="ts">
import { categoryService } from '~/api/cashier/CategoryService';
import type { Category } from '~/common/types';

const emit = defineEmits(['category-select']);
const categories: Ref<Array<Category> | null> = ref(null);
const selected: Ref<string | null> = ref(null);
const isFetching: Ref<boolean> = ref(true);

onMounted(() => {
    fetch();
});
async function fetch() {
    try {
        isFetching.value = true;
        const response = await categoryService.fetch();
        isFetching.value = false;
        if (!response.data) throw 'Unable to fetch categories.';
        categories.value = response.data;
    } catch (error) {
        isFetching.value = false;
        console.error(error);
    }
}
function handleSelect(uuid: string | null) {
    selected.value = uuid;
    emit('category-select', uuid);
}

const cardClass = computed(
    () =>
        'min-h-28 min-w-28 rounded-xl flex justify-center items-center cursor-pointer select-none',
);
const normalClass = computed(
    () => 'border border-primaryBorder bg-white text-primaryColor',
);
const selectedClass = computed(
    () =>
        'border-2 border-secondaryColor bg-secondaryColorTransparent text-secondaryColor font-bold',
);
</script>

<template>
    <div class="w-full mb-4 overflow-x-auto overflow-y-hidden">
        <div
            v-if="isFetching"
            class="w-full flex justify-start items-start flex-wrap gap-2"
        >
            <div
                class="animate-pulse w-[112px] h-[112px] overflow-y-hidden bg-slate-200 rounded-xl flex flex-col items-start justify-start"
            ></div>
            <div
                class="animate-pulse w-[112px] h-[112px] overflow-y-hidden bg-slate-200 rounded-xl flex flex-col items-start justify-start"
            ></div>
            <div
                class="animate-pulse w-[112px] h-[112px] overflow-y-hidden bg-slate-200 rounded-xl flex flex-col items-start justify-start"
            ></div>
            <div
                class="animate-pulse w-[112px] h-[112px] overflow-y-hidden bg-slate-200 rounded-xl flex flex-col items-start justify-start"
            ></div>
        </div>
        <div v-else class="w-[90%] flex justify-start items-center gap-2">
            <div
                @click="handleSelect(null)"
                :class="[cardClass, !selected ? selectedClass : normalClass]"
            >
                All
            </div>
            <div
                v-if="categories"
                v-for="item in categories"
                :key="item.uuid"
                :class="[
                    cardClass,
                    selected === item.uuid ? selectedClass : normalClass,
                ]"
                @click="handleSelect(item.uuid)"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
