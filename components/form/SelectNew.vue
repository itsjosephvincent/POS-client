<script setup lang="ts">
interface SelectOption {
    key: string;
    value: string;
    label: string;
}
const props = defineProps<{
    name: string;
    options: Array<SelectOption> | null;
    preSelectedData: SelectOption | null;
    placeholder: string;
}>();
const select = defineModel();
const selectedOption: Ref<SelectOption | null> = ref(null);
const boxRef = useTemplateRef('boxRef');
function toggle() {
    isOpen.value = !isOpen.value;
}
function handleClickOutside(event: any) {
    if (boxRef.value && !boxRef.value.contains(event.target)) {
        isOpen.value = false;
    }
}
function itemSelect(item: SelectOption) {
    selectedOption.value = item;
    select.value = item.value;
    isOpen.value = false;
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    if (props.preSelectedData) {
        itemSelect(props.preSelectedData);
    }
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
const isOpen: Ref<boolean> = ref(false);
const labelText = computed(() =>
    !selectedOption.value ? 'Select Table' : selectedOption.value?.label,
);
</script>

<template>
    <div class="w-full relative" ref="boxRef">
        <button
            @click="toggle"
            :class="[
                'w-full h-[46px] px-4 rounded-xl flex justify-between items-center',
                isOpen
                    ? 'border-2 border-secondaryColor'
                    : 'border border-primaryBorder',
            ]"
        >
            <span>{{ labelText }}</span>
            <IconSvg
                :icon="!isOpen ? 'downSmall' : 'upSmall'"
                size="1em"
                color="primaryText"
            />
        </button>
        <div
            v-if="isOpen"
            class="w-full absolute top-[47px] left-0 bg-white py-2 px-1 border border-primaryBorder rounded-md text-primaryText"
        >
            <div
                v-for="item in options"
                :key="item.key"
                @click="itemSelect(item)"
                class="cursor-pointer w-full p-1 px-4 hover:bg-secondaryColorTransparent hover:rounded-md"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>
