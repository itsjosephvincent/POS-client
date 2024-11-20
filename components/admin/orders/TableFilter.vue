<script setup lang="ts">
const showPopup = ref(false);
const popupRef: Ref<any> = ref(null);
function handleClickOutside(event: any) {
    console.log(popupRef);
    if (popupRef.value && !popupRef.value.contains(event.target)) {
        showPopup.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const displayCss = computed(() =>
    !showPopup.value ? 'scale-y-0' : 'scale-y-1',
);
</script>

<template>
    <div>
        <button ref="popupRef" @click="showPopup = !showPopup">
            <IconSvg icon="filter" size="1.5em" />
        </button>

        <div
            :class="[
                'w-36 h-16 absolute right-[15px] bottom-[0px]] z-50 bg-white rounded-lg border border-primaryBorder shadow flex flex-col justify-center items-start transition-transform origin-top-right duration-300',
                displayCss,
            ]"
        >
            <div
                class="flex justify-start items-center gap-4 px-4 py-2 pl-4 cursor-pointer mx-2 my-2 rounded-xl text-primaryText hover:text-secondaryColor"
            ></div>
        </div>
    </div>
</template>
