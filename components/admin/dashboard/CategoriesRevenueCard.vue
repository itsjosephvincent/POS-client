<script setup lang="ts">
import * as d3 from 'd3';
import { reportService } from '~/api/admin/ReportService';

interface CategoryEarnings {
    category_id: number;
    name: string;
    total_quantity: string;
    total_cost: string;
    sold: string;
    earnings: string;
}

const chart = ref(null);

const width = 200;
const height = 130;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const radius =
    Math.min(width, height) / 2 - Math.max(...Object.values(margin)) / 2;

const color = d3.scaleOrdinal(d3.schemeTableau10);

const props = defineProps<{
    date: Array<Date> | null;
    store: string | null;
}>();
const itemsData: Ref<any> = ref([]);

async function fetch() {
    try {
        let params: any = {};
        if (props.date) {
            params.date = Array.from(
                props.date.map((i: Date) => Math.floor(i.getTime() / 1000)),
            ).join(',');
        }
        if (props.store && props.store != 'all') {
            params.store = props.store;
        }
        const response = await reportService.category(params);
        if (response && response.data) {
            itemsData.value = response.data.map((i: CategoryEarnings) => {
                return { label: i.name, value: parseFloat(i.earnings) };
            });
            setTimeout(() => {
                draw();
            }, 100);
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        console.error(error);
    }
}

watch(
    () => props.date,
    () => {
        fetch();
    },
    { immediate: true },
);
watch(
    () => props.store,
    () => {
        fetch();
    },
);

onMounted(() => {
    fetch();
});

function draw() {
    d3.select(chart.value).selectAll('*').remove();
    Array.from(document.body.querySelectorAll('.categories-tooltip')).forEach(
        (i) => i.remove(),
    );

    const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'categories-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', '1px solid #d3d3d3')
        .style('padding', '5px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none');

    // Create the SVG canvas
    const svg = d3
        .select(chart.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create the pie layout
    const pie = d3
        .pie()
        .sort(null) // Disable sorting by value
        .value((d: any) => d.value);

    // Create the arc generator for the donut slices
    const arc: any = d3
        .arc()
        .innerRadius(radius * 0.6) // Inner radius for donut hole
        .outerRadius(radius);

    // Generate the donut chart slices
    const arcs = svg
        .selectAll('arc')
        .data(pie(itemsData.value))
        .enter()
        .append('g')
        .attr('class', 'arc');

    // Append the paths (slices)
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d: any) => color(d.data.label))
        .on('mouseover', (event: any, d: any) => {
            tooltip
                .style('visibility', 'visible')
                .text(`${d.data.label}: ${d.value}`);
        })
        .on('mousemove', (event: any) => {
            tooltip
                .style('top', `${event.pageY - 10}px`)
                .style('left', `${event.pageX + 10}px`);
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });
}

const hasData = computed(() => itemsData?.value && itemsData?.value?.length);
</script>

<template>
    <div
        class="w-full md:w-[40%] md:max-w-[450px] bg-secondaryBg p-4 rounded-xl border border-primaryBorder text-primaryText flex flex-col justify-center items-center"
    >
        <div class="text-lg">Earnings by Category</div>
        <div ref="chart" class="h-fit" v-if="hasData"></div>
        <div
            class="h-[120px] w-[200px] flex justify-center items-center text text-secondaryText"
            v-else
        >
            No data to display
        </div>
        <div class="flex justify-center items-center my-1">
            <div
                v-for="(item, index) in itemsData"
                :key="item.label"
                class="flex flex-col justify-center items-center gap-1 mx-2"
            >
                <span
                    v-if="item.label"
                    :class="['p-2 rounded-md border border-primaryBorder']"
                    :style="`background: ${color(item.label)}`"
                ></span>
                <span v-if="item.label" class="text text-xs">{{
                    item.label
                }}</span>
            </div>
        </div>
    </div>
</template>
