<script setup lang="ts">
const selectedDate = ref('');
const formattedDate = ref('');
const isRangeModel = defineModel('isRange');
const isChecked = ref(isRangeModel);

function toggleSwitch() {
    isChecked.value = !isChecked.value;
}
watch(
    () => isRangeModel,
    (newValue) => {
        isChecked.value = newValue;
    },
);

function onDateChange() {
    if (selectedDate.value) {
        formattedDate.value = new Date(selectedDate.value).toLocaleDateString(
            'en-US',
            { month: 'short', day: 'numeric', year: 'numeric' },
        );
        console.log(selectedDate.value);
        console.log(formattedDate.value);
    }
}
const dateLabel = computed(() =>
    !formattedDate.value ? 'Select Date' : `${formattedDate.value}`,
);
</script>

<template>
    <div>
        <div class="hidden font-lg text-lg">{{ dateLabel }}</div>

        <div class="flex justify-start items-center">
            <div :class="['hidden text-md text-primaryText']">Range</div>
            <div
                :class="[
                    'hidden relative inline-flex items-center ml-2 w-9 h-4 rounded-full cursor-pointer transition',
                    {
                        'bg-secondaryColor': isChecked,
                        'bg-gray-400': !isChecked,
                    },
                ]"
                @click="toggleSwitch"
            >
                <span
                    :class="[
                        'switch-handle inline-block mx-1 w-3 h-3 bg-white rounded-full transition-transform duration-500 ease-in-out',
                        {
                            'translate-x-4': isChecked,
                            'translate-x-0': !isChecked,
                        },
                    ]"
                ></span>
            </div>
        </div>

        <div class="flex justify-start items-center">
            <div class="pb-4">
                <label for="datepicker"></label>
                <input
                    class="outline-0 text-primaryText border border-primaryBorder focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-8 rounded-lg px-4"
                    type="date"
                    id="datepicker"
                    v-model="selectedDate"
                    @input="onDateChange"
                />
            </div>
        </div>
    </div>
</template>
