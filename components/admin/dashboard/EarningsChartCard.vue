<script setup lang="ts">
import * as d3 from 'd3';
import { reportService } from '~/api/admin/ReportService';

const chart = ref(null);

// Line chart settings
const width = 200;
const height = 100;
const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const color = d3.scaleOrdinal(d3.schemeTableau10);

const props = defineProps<{
    date: string | null;
}>();
const itemsData = ref([]);

async function fetch() {
    try {
        let params: any = {};
        if (props.date) {
            params.date = props.date;
        }
        const response = await reportService.store(params);
        if (response && response.data) {
            itemsData.value = response.data;
            draw();
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetch();
});
watch(
    () => props.date,
    () => {
        fetch();
    },
    { immediate: true },
);

function draw() {
    // Clear previous chart
    d3.select(chart.value).select('svg').remove();

    const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', '1px solid #d3d3d3')
        .style('padding', '5px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none');

    // Create SVG
    const svg = d3
        .select(chart.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
        .scaleBand()
        .domain(
            itemsData.value.map((d: any) => {
                return d.store_name;
            }),
        )
        .range([0, width])
        .padding(0.2);

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(itemsData.value, (d: any) => parseFloat(d.sold))])
        .range([height, 0]);

    // Axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    // .selectAll('text')
    // .attr('transform', 'rotate(-40)')
    // .style('text-anchor', 'end')
    // .style('font-size', '8px');

    svg.append('g').call(d3.axisLeft(y).ticks(5));

    // Bars
    svg.selectAll('.bar')
        .data(itemsData.value)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d: any) => x(d.store_name))
        .attr('y', (d: any) => y(parseFloat(d.sold)))
        .attr('value', (d: any) => parseFloat(d.sold))
        .attr('width', x.bandwidth())
        .attr('height', (d: any) => {
            return height - y(parseFloat(d.sold));
        })
        .attr('fill', (d: any) => color(d.store_name))
        .on('mouseover', (event: any, d: any) => {
            tooltip
                .style('visibility', 'visible')
                .text(`${d.store_name}: ${d.sold}`);
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
</script>

<template>
    <div
        class="bg-secondaryBg p-4 rounded-xl border border-primaryBorder text-primaryText"
    >
        <div class="text-lg">Sold by Store</div>
        <div ref="chart" class="h-fit"></div>
        <div class="flex justify-center items-center my-1">
            <div
                v-for="(item, index) in itemsData"
                class="flex justify-start items-center gap-1 mx-2"
            >
                <span
                    :class="['p-2 rounded-md border border-primaryBorder']"
                    :style="`background: ${color(item.store_name)}`"
                ></span>
                <span class="text text-xs">{{ item.store_name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Optional styling */
svg {
    font-size: 12px;
}

.axis-label {
    font-size: 14px;
    font-weight: bold;
}
</style>
