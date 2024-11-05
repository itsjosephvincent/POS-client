<script setup lang="ts">
enum ConfigOptions {
    Cash = 'CASH',
    Discount = 'DISCOUNT',
    Service = 'SERVICE',
}

const selected: Ref<ConfigOptions> = ref(ConfigOptions.Cash);

function selectOption(option: ConfigOptions) {
    selected.value = option;
}

const tabClass = computed(() => 'font-bold text-primaryText');
const activeTabClass = computed(
    () => 'font-bold text-secondaryColor border-b-2 border-secondaryColor',
);
</script>

<template>
    <div class="w-full h-[300px]">
        <div class="w-full mx-2 mt-2 flex justify-start items-center gap-4">
            <div
                @click="selectOption(ConfigOptions.Cash)"
                :class="[
                    'cursor-pointer select-none',
                    selected === ConfigOptions.Cash ? activeTabClass : tabClass,
                ]"
            >
                Cash
            </div>
            <div
                @click="selectOption(ConfigOptions.Discount)"
                :class="[
                    'cursor-pointer select-none',
                    selected === ConfigOptions.Discount
                        ? activeTabClass
                        : tabClass,
                ]"
            >
                Discount
            </div>
            <div
                @click="selectOption(ConfigOptions.Service)"
                :class="[
                    'cursor-pointer select-none',
                    selected === ConfigOptions.Service
                        ? activeTabClass
                        : tabClass,
                ]"
            >
                Service
            </div>
        </div>
        <CashierBillingOptionCash v-if="selected === ConfigOptions.Cash" />
    </div>
</template>
