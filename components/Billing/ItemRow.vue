<script setup lang="ts">

const props = defineProps({
    item: { type: String, required: true },
    image: { type: String, required: true },
})

</script>

<template>
    <div class="xl:mx-2 lg:p-2 flex gap-2 lg:gap-4 hover:bg-tertiaryBg xl:rounded-xl">
        <img class="object-contain rounded-xl w-14" :src="props.image" alt="props.item">
        <div class="grow flex flex-col justify-around items-start">
            <div class="text font-bold text-primaryText">{{ props.item }}</div>
            <div class="flex items-center gap-4">
                <div class="text font-bold text-primaryText">x1</div>
                <div class="w-20 flex justify-between p-2 px-3 rounded-xl bg-primaryColor">
                    <div class="text-xs text-white">Notes</div>
                    <IconSvg icon="edit" color="#FFF" height="1em" width="1em" />
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="grow"></div>
            <div class="text font-bold text-tertiaryText">P 390</div>
        </div>
    </div>
</template>