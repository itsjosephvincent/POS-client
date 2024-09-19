<template>
    <div class="h-screen flex flex-row bg-slate-50">
        <AppSidebar />
        <div class="right h-full grow">
            <AppHeader />
            <slot />
        </div>
    </div>
</template>