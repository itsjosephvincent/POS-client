<script setup lang="ts">
import * as d3 from 'd3'

const chart = ref(null)
const data = [
    { label: 'Beverages', value: 40000 },
    { label: 'Coffee', value: 70000 },
    { label: 'Pasta', value: 50000 },
    { label: 'Meals', value: 90000 },
]

const width = 300
const height = 170
const margin = { top: 20, right: 20, bottom: 20, left: 20 }
const radius = Math.min(width, height) / 2 - Math.max(...Object.values(margin)) / 2

const color = d3.scaleOrdinal(d3.schemeTableau10)

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
        .style('pointer-events', 'none')

    // Create the SVG canvas
    const svg = d3
        .select(chart.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)

    // Create the pie layout
    const pie = d3
        .pie()
        .sort(null) // Disable sorting by value
        .value((d: any) => d.value)

    // Create the arc generator for the donut slices
    const arc = d3
        .arc()
        .innerRadius(radius * 0.6) // Inner radius for donut hole
        .outerRadius(radius)

    // Generate the donut chart slices
    const arcs = svg
        .selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')

    // Append the paths (slices)
    arcs
        .append('path')
        .attr('d', arc)
        .attr('fill', (d: any) => color(d.data.label))
        .on('mouseover', (event: any, d: any) => {
            tooltip.style('visibility', 'visible').text(`${d.data.label}: ${d.value}`)
        })
        .on('mousemove', (event: any) => {
            tooltip
                .style('top', `${event.pageY - 10}px`)
                .style('left', `${event.pageX + 10}px`)
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden')
        })
})


</script>

<template>
    <div class="bg-secondaryBg p-4 rounded-xl border border-primaryBorder text-primaryText">
        <div class="text-lg">Earnings by Classification</div>
        <div ref="chart" class=""></div>
        <div class="flex justify-end items-center my-1">
            <div v-for="(item, index) in data" class="flex justify-start items-center gap-1 mx-2">
                <span :class="['p-2 rounded-md border border-primaryBorder']" :style="`background: ${color(item.label)}`"></span>
                <span class="text text-xs">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>