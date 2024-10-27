<script setup lang="ts">
const userStore = useUserStore();
const pageStore = usePageStore();
const user = userStore.getUser;

const showPopup = ref(false);
const popupRef = ref(null);
async function logout() {
    const role = userStore.getRole;
    localStorage.removeItem('_token');
    userStore.resetUser();
    pageStore.resetPageData();
    await navigateTo(`/${role.toLowerCase()}/login`);
}
function handleClickOutside(event: any) {
    if (popupRef.value && !popupRef.value.contains(event.target)) {
        showPopup.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const displayCss = computed(() =>
    !showPopup.value ? 'scale-y-0' : 'scale-y-1',
);
</script>

<template>
    <div class="relative z-10 flex justify-center">
        <div class="px-4 flex items-center gap-4">
            <div class="hidden md:flex flex-col justify-center items-start">
                <div class="text-xs text-secondaryText font-bold">
                    Cashier Today!
                </div>
                <div class="text font-bold text-primaryText">
                    {{ user.name }}
                </div>
            </div>
            <button
                ref="popupRef"
                @click="showPopup = !showPopup"
                class="rounded-full border border-primaryBorder"
            >
                <img
                    :alt="user.name"
                    src="/img/user.svg"
                    class="object-contain rounded-xl"
                    height="50"
                    width="50"
                />
            </button>
        </div>
        <div
            :class="[
                'w-36 h-16 absolute right-[8px] bottom-[-68px] z-50 bg-white rounded-lg border border-primaryBorder shadow flex flex-col justify-center items-start transition-transform origin-top-right duration-300',
                displayCss,
            ]"
        >
            <div
                @click="logout"
                id="logout"
                class="flex justify-start items-center gap-4 px-4 py-2 pl-4 cursor-pointer mx-2 my-2 rounded-xl text-primaryText hover:text-secondaryColor"
            >
                <IconSvg color="current" icon="logout" size="1em" />
                <div class="font-lg font-medium">Logout</div>
            </div>
        </div>
    </div>
</template>
