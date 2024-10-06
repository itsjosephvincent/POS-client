<script setup lang="ts">

const props = defineProps<{
    name: string
    placeholder: string
    icon?: string
    modelValue?: string
    bgClass?: string
}>()

const isPassword = ref(true)
const type = computed(() => isPassword.value ? 'password' : 'text')
const currentIcon = computed(() => isPassword.value ? 'eyeClosed' : 'eye')
const getBgClass = computed(() => props.bgClass || 'bg-primaryBg')

function toggleMode() {
    isPassword.value = !isPassword.value
    console.log(isPassword.value)
}
</script>

<template>
    <div class="w-full">
        <div :class="['relative h-12 rounded-xl flex items-center bg-primaryBg border border-primaryBorder',]">
            <IconSvg v-if="props.icon" class="mr-4 absolute left-[10px]" icon="password" color="tertiaryText" size="30px" />
            <input :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
                :name="props.name" :id="props.name" :placeholder="props.placeholder"
                :class="['grow border-0 outline-0 text-primaryText focus:border focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-full w-full rounded-xl px-4 pl-[60px] pr-[57px]', getBgClass,]">
            <IconSvg @click="toggleMode" class="mr-4 absolute right-[10px]" :icon="currentIcon" color="tertiaryText" size="30px" />
        </div>
    </div>
</template>
