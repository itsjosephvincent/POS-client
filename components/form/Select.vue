<script setup lang="ts">

interface SelectOptions {
    key: string
    value: string
    label: string
}
const props = defineProps<{
    name: string
    label: string
    placeholder: string
    icon?: string
    bgClass?: string
    borderClass?: string
    options: Array<SelectOptions>
    preSelectedData: SelectOptions
}>()
const emit = defineEmits(['selectClassification'])
const isDropdown = ref(false)
const getBgClass = computed(() => props.bgClass || 'bg-secondaryBg')
const getBorderClass = computed(() => props.borderClass || 'border boder-primaryBorder')
const inputModel = defineModel('input')
const selectedValue = ref('')
const searchValue = ref('')

onMounted(() => {
    setPreSelectedData()
})

function setPreSelectedData() {
    if (props.preSelectedData) {
        onSelect(props.preSelectedData)
    }
}
function onFocus() {
    isDropdown.value = true
}
function onBlur() {
    isDropdown.value = false
}
function onSelect(item: SelectOptions) {
    inputModel.value = item.label
    selectedValue.value = item.value
    searchValue.value = ''
    emit('selectClassification', selectedValue.value)
}
function onSearch() {
    isDropdown.value = true
    searchValue.value = inputModel.value || ''
}
const filteredItems = computed(() => {
    if (!searchValue.value) {
        return props.options
    } else {
        let filter = props.options.filter((item) => item.label.toLocaleLowerCase().includes(searchValue.value))
        return filter
    }
})

</script>

<template>
    <div class="w-full relative">
        <div class="ml-2 text-primaryText">{{ props.label }}</div>
        <div :class="['relative h-12 rounded-xl flex items-center', getBgClass, getBorderClass]">
            <input v-model="inputModel" @input="onSearch" @focus="onFocus" @blur="onBlur" type="text"
                :name="props.name" :id="props.name" :placeholder="props.placeholder"
                :class="['grow border-0 outline-0 text-primaryText focus:border focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-full w-full rounded-xl px-4 pr-[57px]', getBgClass]">
            <IconSvg class="mr-4 absolute right-0" icon="downSmall" color="var(--text-secondary)" size="1.5em" />
        </div>
        <div v-if="isDropdown" class="z-20 w-full max-h-[180px] absolute top-[73px] left-0 overflow-y-auto bg-secondaryBg border border-primaryBorder py-2">
            <div v-if="!filteredItems.length" class="py-2 px-4 cursor-default text-primaryText">No results.</div>
            <div v-for="item in filteredItems" class="py-2 px-4 cursor-default hover:bg-secondaryColorTransparent text-primaryText" :key="item.key" :value="item.value" @mousedown="onSelect(item)">{{ item.label }}</div>
        </div>
    </div>
</template>