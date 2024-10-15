<script setup lang="ts">
import * as d3 from 'd3';

const props = defineProps<{
    data: Array<object>;
}>();
const chart = ref(null);

// Line chart settings
const width = 300;
const height = 120;
const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const colors = ['#0fa3b1', '#a7c957', '#f07167'];
const getDates = (): Array<Date> => {
    let dates: Array<Date> = [];
    props.data.forEach((item) => {
        dates.push(...item.data.map((d) => d.date));
    });
    return dates;
};
const getValues = (): Array<number> => {
    let values: Array<number> = [];
    props.data.forEach((item) => {
        values.push(...item.data.map((d) => d.value));
    });
    return values;
};

onMounted(() => {
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

    const svg = d3
        .select(chart.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
        .scaleTime()
        .domain(d3.extent(getDates(), (d: any) => d))
        .range([0, width]);

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(getValues(), (d: any) => d)])
        .range([height, 0]);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b')));

    svg.append('g').call(d3.axisLeft(y).ticks(5));

    const line = d3
        .line()
        .x((d: any) => x(d.date))
        .y((d: any) => y(d.value))
        .curve(d3.curveMonotoneX);

    const drawLines = (
        item: object,
        strokeColor: string,
        fillColor: string,
    ) => {
        svg.append('path')
            .datum(item.data)
            .attr('fill', 'none')
            .attr('stroke', strokeColor)
            .attr('stroke-width', 2)
            .attr('d', line);

        svg.selectAll('dot')
            .data(item.data)
            .enter()
            .append('circle')
            .attr('cx', (d: any) => x(d.date))
            .attr('cy', (d: any) => y(d.value))
            .attr('r', 4)
            .attr('fill', fillColor)
            .on('mouseover', (event: any, d: any) => {
                tooltip
                    .style('visibility', 'visible')
                    .text(`${item.name} Revenue: ${d.value}`);
            })
            .on('mousemove', (event: any) => {
                tooltip
                    .style('top', `${event.pageY - 10}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden');
            });
    };

    props.data.forEach((item, index) => {
        drawLines(item, colors[index], colors[index]);
    });
});
</script>

<template>
    <div
        class="bg-secondaryBg p-4 rounded-xl border border-primaryBorder text-primaryText"
    >
        <div class="text-lg">Revenue</div>
        <div ref="chart" class=""></div>
        <div class="flex justify-end items-center my-1">
            <div
                v-for="(item, index) in data"
                class="flex justify-start items-center gap-1 mx-2"
            >
                <span
                    :class="['p-2 rounded-md border border-primaryBorder']"
                    :style="`background: ${colors[index]}`"
                ></span>
                <span class="text text-xs">{{ item.name }}</span>
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
