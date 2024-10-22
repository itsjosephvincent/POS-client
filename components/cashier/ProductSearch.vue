<script setup lang="ts">
const emit = defineEmits(['onFilter']);
const searchInputModel = defineModel();

function filter() {
    emit('onFilter', searchInputModel.value);
}
</script>

<template>
    <div
        class="w-[250px] md:w-[300px] lg:w-[400px] h-10 bg-secondaryBg rounded-xl border border-primaryBorder flex items-center px-4"
    >
        <input
            v-model="searchInputModel"
            type="text"
            name="search"
            id="search"
            placeholder="Search Menu"
            class="w-3/4 border-0 grow outline-0 text-secondaryText bg-secondaryBg text-xs"
        />
        <IconSvg
            @click="filter"
            class="cursor-pointer"
            icon="search"
            color="secondaryText"
            size="1.5em"
        />
    </div>
</template>
