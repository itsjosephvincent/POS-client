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
    error?: string;
}>();
const select = defineModel();
const emit = defineEmits(['update:modelValue']);
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
    emit('update:modelValue', selectedOption.value.value);
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
    !selectedOption.value ? props.placeholder : selectedOption.value?.label,
);
const errorClass = computed(() =>
    props.error ? 'border-2 border-red-500' : '',
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
                !selectedOption ? 'text-secondaryText' : 'text-primaryText',
                errorClass,
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
            :class="[
                'w-full absolute z-50 top-[47px] left-0 bg-white py-2 px-1 border border-primaryBorder rounded-md',
            ]"
        >
            <div
                v-for="item in options"
                :key="item.key"
                @click="itemSelect(item)"
                class="cursor-pointer w-full p-1 px-4 hover:bg-secondaryColorTransparent hover:rounded-md text-primaryText"
            >
                {{ item.label }}
            </div>
        </div>
        <div
            :class="[
                'px-1 pt-1 text-sm text-errorColor',
                error ? 'visible' : 'invisible',
            ]"
        >
            {{ error }}
        </div>
    </div>
</template>
