<script setup lang="ts">

const props = defineProps({
    name: { type: String, require: true, },
    placeholder: { type: String, require: true, },
    icon: { type: String, require: false, },
})

const isPassword = ref(false)
const type = computed(() => isPassword.value ? 'password' : 'text')
const currentIcon = computed(() => isPassword.value ? 'eyeClosed' : 'eye')

function toggleMode() {
    isPassword.value = !isPassword.value
    console.log(isPassword.value)
}
</script>

<template>
    <div class="w-[calc(90%)] max-w-96 h-12 bg-secondaryBg rounded-xl border border-secondaryBorder flex items-center px-4 my-4">
        <IconSvg icon="password" color="var(--text-primary)" height="1.5em" width="1.5em" />
        <input @input="$emit('valueChange', $event)" :type="type" :name="props.name" :id="props.name" :placeholder="props.placeholder" class="grow ml-2 w-3/4 border-0 outline-0 text-secondaryText bg-secondaryBg text-xs">
        <IconSvg @click="toggleMode" class="cursor-pointer" :icon="currentIcon" color="var(--text-primary)" height="1.5em" width="1.5em" />
    </div>
</template>