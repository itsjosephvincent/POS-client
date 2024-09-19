<script setup lang="ts">
import { ref, computed } from 'vue'

const displayMobileSidebar = ref(false)

const mobileSidebarVisibility = computed(() => displayMobileSidebar.value ? 'block' : 'hidden')
const openButtonVisibility = computed(() => displayMobileSidebar.value ? 'hidden' : 'false')

function open(event) {
    displayMobileSidebar.value = true
}

function close(event) {
    displayMobileSidebar.value = false
}

</script>

<template>
    <div :class="`${openButtonVisibility} md:hidden fixed top-2 left-2`" @click="open">Open</div>
    <div class="left hidden md:block h-full w-1/4 bg-white p-2 border-r-2">
        <h1>Sidebar</h1>
    </div>
    <div :class="`left ${ mobileSidebarVisibility } h-full w-1/4 bg-white p-2 border-r-2`">
        <span class="px-2" @click="close">X</span>
        Mobile Sidebar
    </div>
</template>