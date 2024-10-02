<script setup lang="ts">
const userStore = useUserStore()
const role = userStore.getRole
const getName = computed(() => {
    if (role === 'SuperAdmin')
        return userStore.getUser.name || ''
    else if (role === 'Store') {
        return `${userStore.getUser.store_name} ${userStore.getUser.branch}` || ''
    }
    else
        return `${userStore.getUser.firstname} ${userStore.getUser.lastname}` || ''
})
const getInitials = computed(() => {
    const user = userStore.getUser
    if (user.initials) {
        return user.initials
    }
    const i = []
    i.push(user.username[0].toUpperCase())
    if (user.username.length > 1)
        i.push(user.username[1])
    return i.join('')
})

</script>

<template>
    <div class="flex items-center justify-end gap-4 mr-4">
        <div class="font-medium text-primaryText">{{ getName }}</div>
        <div class="h-[40px] w-[40px] rounded-full flex items-center justify-center">
            <span v-if="false" class="h-full w-full bg-secondaryColor text-center font-bold text-white">{{ getInitials }}</span>
            <img v-if="true" class="h-full w-full" src="/img/user.svg" :alt="getName">
        </div>
        
    </div>
</template>