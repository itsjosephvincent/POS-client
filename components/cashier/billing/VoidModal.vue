<script setup lang="ts">
const props = defineProps<{
    visible: boolean;
    uuid?: string;
}>();
</script>

<template>
    <div
        v-if="props.visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div
            class="bg-white rounded-lg shadow-lg w-full mx-4 max-w-lg p-4 relative"
        >
            <slot></slot>
            <div class="flex justify-start items-center gap-2">
                <PrimaryButton
                    @click="$emit('deleteConfirmed')"
                    label="Void Item"
                    custom-class="bg-errorColor text-white px-3"
                />
                <PrimaryButton
                    @click="$emit('closeDeleteModal')"
                    label="Cancel"
                    custom-class="bg-white text-primaryText border border-primaryBorder px-3"
                />
            </div>
        </div>
    </div>
</template>
