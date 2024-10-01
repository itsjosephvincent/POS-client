<script setup lang="ts">
const userStore = useUserStore()
const role = userStore.getRole
const getName = computed(() => {
    if (role === 'SuperAdmin')
        return userStore.getUser.name || ''
    else
        return `${userStore.getUser.firstname} ${userStore.getUser.lastname}` || ''
})

</script>

<template>
    <div class="flex items-center justify-end gap-4 mr-4">
        <div class="font-medium text-primaryText">{{ getName }}</div>
        <img class="h-10 w-10 dark:w-9 dark:h-9 rounded-full bg-gray-50" src="/img/user.svg" :alt="getName">
    </div>
</template>