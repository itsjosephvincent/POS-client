<script setup lang="ts">
const props = defineProps<{
    placeholder?: string;
}>();

const emit = defineEmits(['onFilter']);
const searchInputModel = defineModel();

function filter() {
    emit('onFilter', searchInputModel.value);
}
</script>

<template>
    <div
        class="w-[250px] lg:w-[300px] h-[42px] bg-secondaryBg rounded-xl border border-primaryBorder flex items-center"
    >
        <input
            @keyup.enter="filter"
            v-model="searchInputModel"
            type="text"
            name="search"
            id="search"
            :placeholder="
                props.placeholder ? props.placeholder : 'Filter items...'
            "
            class="w-3/4 border-0 grow outline-0 text-secondaryText bg-secondaryBg text-sm px-4"
        />
        <div
            class="h-full flex items-center justify-center rounded-full cursor-pointer p-2"
        >
            <IconSvg @click="filter" icon="search" size="1.5em" />
        </div>
    </div>
</template>
