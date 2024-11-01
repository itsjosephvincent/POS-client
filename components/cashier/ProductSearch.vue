<script setup lang="ts">
import useProductFilter from '~/components/cashier/composables/useProductFilter';

const searchInputModel = defineModel();
const { productFilter } = useProductFilter();

function filter() {
    productFilter.value = searchInputModel.value;
}
</script>

<template>
    <div class="">
        <form
            @submit.prevent="filter"
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
            <button type="submit">
                <IconSvg
                    class="cursor-pointer"
                    icon="search"
                    color="secondaryText"
                    size="1.5em"
                />
            </button>
        </form>
    </div>
</template>
