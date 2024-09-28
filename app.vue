<script setup lang="ts">
import { useThemeStore } from '~/stores/theme.js'
import { useUserStore } from '~/stores/user.js'

const userStore = useUserStore()
const user = userStore.state.user
const getLayout = (role: string):string => {
    let layout = 'unauthenticated'
    if (role === 'SuperAdmin') layout = 'superadmin'
    else if (role === 'Admin') layout = 'admin'
    else if (role === 'Branch') layout = 'branch'
    else if (role === 'Cashier') layout = 'cashier'
    return layout
}
const layout = computed(() => getLayout(userStore.getRole))

</script>

<template>
    <NuxtLayout :name="layout">
        <NuxtPage />
    </NuxtLayout>
</template>
