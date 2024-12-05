<script setup lang="ts">
import * as d3 from 'd3';
import { reportService } from '~/api/store/ReportService';

const props = defineProps<{
    date: Array<Date> | null;
}>();
const itemsData = ref([]);
const isLoading = ref(false);

const chart = ref(null);

const viewport = useViewport();

const color = d3.scaleOrdinal(d3.schemeTableau10);

async function fetch() {
    try {
        let params: any = {};
        if (props.date) {
            params.date = Array.from(
                props.date.map((i: Date) => Math.floor(i.getTime() / 1000)),
            ).join(',');
        }
        isLoading.value = true;
        const response = await reportService.item_sales_daily(params);
        isLoading.value = false;
        if (response && response.data) {
            itemsData.value = response.data;
            setTimeout(() => {
                draw();
            }, 100);
        } else {
            throw 'Empty data.';
        }
    } catch (error) {
        isLoading.value = false;
        console.error(error);
    }
}

onMounted(() => {
    window.addEventListener('resize', draw);
});

watch(
    () => props.date,
    () => {
        fetch();
    },
    { immediate: true },
);

function draw() {
    // Line chart settings
    let width = viewport.isLessThan('tablet') ? 200 : 500;

    const height = 100;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    // Clear previous chart
    d3.select(chart.value).selectAll('*').remove();
    Array.from(document.body.querySelectorAll('.earnings-tooltip')).forEach(
        (i) => i.remove(),
    );

    const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'earnings-tooltip')
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
    const x0 = d3
        .scaleBand()
        .domain(
            itemsData.value.map((d: any) => {
                return d.report_date;
            }),
        )
        .range([0, width])
        .padding(0.2);
    const x1 = d3
        .scaleBand()
        .domain(
            itemsData.value.map((d: any) => {
                return d.name;
            }),
        )
        .range([0, x0.bandwidth()])
        .padding(0.05);

    const y = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(itemsData.value, (d: any): any => parseFloat(d.net_sales)),
        ])
        .range([height, 0]);

    // Axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x0));

    svg.append('g').call(d3.axisLeft(y).ticks(5));

    // Bars
    svg.selectAll('.bar')
        .data(itemsData.value)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('transform', (d: any) => `translate(${x0(d.report_date)},0)`)
        .attr('x', (d: any): any => x1(d.name))
        .attr('y', (d: any) => y(parseFloat(d.net_sales)))
        .attr('value', (d: any) => parseFloat(d.net_sales))
        .attr('width', x1.bandwidth())
        .attr('height', (d: any) => {
            return height - y(parseFloat(d.net_sales));
        })
        .attr('fill', (d: any) => color(d.name))
        .on('mouseover', (event: any, d: any) => {
            tooltip
                .style('visibility', 'visible')
                .text(`${d.name}: ${d.net_sales}`);
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

const hasData = computed(() => itemsData.value?.length);
const products = computed(() => [
    ...new Set(itemsData.value.map((i: any) => i.name)),
]);
</script>

<template>
    <div
        class="w-full bg-secondaryBg p-4 rounded-xl border border-primaryBorder text-primaryText flex flex-col justify-center items-center"
    >
        <div class="text-lg">Net Sales</div>
        <div ref="chart" class="h-fit" v-if="hasData"></div>
        <div
            class="w-full flex justify-center items-center my-1 gap-2 flex-wrap"
            v-if="hasData"
        >
            <div
                v-for="(item, index) in products"
                class="flex flex-col justify-center items-center gap-2"
            >
                <div
                    :class="['p-2 rounded-md border border-primaryBorder']"
                    :style="`background: ${color(item)}`"
                ></div>
                <div class="text-xs text-ellipsis overflow-hidden">
                    {{ item }}
                </div>
            </div>
        </div>
        <div
            class="h-[120px] w-[200px] flex justify-center items-center text text-secondaryText"
            v-if="!hasData"
        >
            No data to display
        </div>
    </div>
</template>
