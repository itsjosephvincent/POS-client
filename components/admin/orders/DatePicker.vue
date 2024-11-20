<script setup lang="ts">
const selectedDate: Ref<String> = ref('');
const formattedDate: Ref<String> = ref('');
const isRangeModel = defineModel('isRange');
const isChecked = ref(isRangeModel);

const emit = defineEmits(['dateChanged']);

function toggleSwitch() {
    isChecked.value = !isChecked.value;
}
onMounted(() => {
    // let date = new Date();
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // selectedDate.value = `${year}-${month}-${day}`;
    // emit('dateChanged', selectedDate.value);
});
watch(
    () => isRangeModel,
    (newValue) => {
        isChecked.value = newValue;
    },
);

function onDateChange() {
    if (selectedDate.value) {
        formattedDate.value = new Date(
            selectedDate.value.toString(),
        ).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }
    emit('dateChanged', selectedDate.value);
}
const dateLabel = computed(() =>
    !formattedDate.value ? 'Select Date' : `${formattedDate.value}`,
);
</script>

<template>
    <div>
        <div class="hidden font-lg text-lg">{{ dateLabel }}</div>

        <div class="hidden flex justify-start items-center">
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
                        'hidden switch-handle inline-block mx-1 w-3 h-3 bg-white rounded-full transition-transform duration-500 ease-in-out',
                        {
                            'translate-x-4': isChecked,
                            'translate-x-0': !isChecked,
                        },
                    ]"
                ></span>
            </div>
        </div>

        <div class="flex justify-start items-center">
            <div class="">
                <label for="datepicker"></label>
                <input
                    class="outline-0 text-primaryText border border-primaryBorder focus:border-secondaryColor focus:ring-1 focus:ring-sky-500 h-10 rounded-xl px-4"
                    type="date"
                    id="datepicker"
                    v-model="selectedDate"
                    @input="onDateChange"
                />
            </div>
        </div>
    </div>
</template>
