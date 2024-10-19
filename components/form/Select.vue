<script setup lang="ts">
interface SelectOption {
    key: string;
    value: string;
    label: string;
}
const props = defineProps<{
    name: string;
    label: string;
    placeholder: string;
    icon?: string;
    bgClass?: string;
    borderClass?: string;
    options: Array<SelectOption> | null;
    preSelectedData: SelectOption | null;
    error?: string;
}>();

const select = ref('');
onMounted(() => {
    select.value = props?.preSelectedData?.value || '';
});
const errorClass = computed(() =>
    props.error ? 'border-2 border-red-500' : '',
);
</script>

<template>
    <div class="w-full relative">
        <div class="relative">
            <div class="ml-2 text-primaryText">{{ props.label }}</div>
            <select
                v-model="select"
                :class="[
                    'relative block w-full px-4 h-[46px] outline-0 text-base text-primaryText border border-primaryBorder rounded-xl bg-white focus:ring-secondaryColor focus:border-2 focus:border-secondaryColor appearance-none invalid:text-secondaryText',
                    errorClass,
                ]"
                required
                @change="$emit('update:modelValue', $event.target.value)"
            >
                <option disabled value="">{{ placeholder }}</option>
                <option
                    v-for="item in options"
                    :key="item.key"
                    :value="item.value"
                >
                    {{ item.label }}
                </option>
            </select>
        </div>
        <IconSvg
            class="mr-4 absolute right-0 top-10"
            icon="downSmall"
            color="secondaryText"
        />
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
