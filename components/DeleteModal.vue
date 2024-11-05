<script setup lang="ts">
const props = defineProps<{
    visible: boolean;
    uuid?: string;
    deleteLabel?: string;
}>();
const emit = defineEmits(['deleteConfirmed', 'closeDeleteModal']);

function confirmDelete() {
    emit('deleteConfirmed');
}
</script>

<template>
    <div
        v-if="props.visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div
            class="bg-white rounded-lg shadow-lg w-full mx-4 max-w-lg p-4 relative"
        >
            <form @submit.prevent="confirmDelete">
                <slot></slot>
                <div class="flex justify-start items-center gap-2">
                    <PrimaryButton
                        type="submit"
                        :label="deleteLabel || 'Delete'"
                        custom-class="bg-errorColor text-white px-3"
                    />
                    <PrimaryButton
                        @click="$emit('closeDeleteModal')"
                        label="Cancel"
                        custom-class="bg-white text-primaryText border border-primaryBorder px-3"
                    />
                </div>
            </form>
        </div>
    </div>
</template>
