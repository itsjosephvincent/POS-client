<script setup lang="ts">

const props = defineProps({
    name: { type: String, require: true, },
    placeholder: { type: String, require: true, },
    icon: { type: String, require: false, },
    postIcon: { type: String, require: false, },
    type: { type: String, require: true, },
    modelValue: { type: String, require: true },
})

const viewPassword = ref(false)
const hasIcon = computed(() => !!props.icon)
const hasPostIcon = computed(() => !!props.postIcon)

</script>

<template>
    <div class="w-[calc(90%)] max-w-96 h-12 bg-secondaryBg rounded-xl border border-secondaryBorder flex items-center px-4">
        <IconSvg v-if="hasIcon" :icon="props.icon" color="var(--text-primary)" height="1.5em" width="1.5em" />
        <input :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="props.type" :name="props.name" :id="props.name" :placeholder="props.placeholder" class="grow ml-2 w-3/4 border-0 grow outline-0 text-secondaryText bg-secondaryBg text-xs">
        <IconSvg v-if="hasPostIcon" :icon="props.postIcon" color="var(--text-primary)" height="1.5em" width="1.5em" />
    </div>
</template>
