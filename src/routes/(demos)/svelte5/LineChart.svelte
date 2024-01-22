<script>
	import { extent, max } from 'd3-array';
	import { DataPoint } from './datapoint.svelte.js';
	import { scaleLinear, scaleUtc } from 'd3-scale';
	import { line } from 'd3-shape';

	/**
	 * @type {{
	 * 	dataPoints: DataPoint[]
	 * 	mainChartWidth?: number
	 *	mainChartHeight?: number
	 *	now?: Date
	 * }}
	 */
	const { dataPoints, mainChartWidth = 800, mainChartHeight = 100, now = new Date() } = $props();

	// Calculate the limits of our input data
	const maxValue = $derived(max(dataPoints, (point) => point.value));
	const [minTime, maxTime] = $derived(extent(dataPoints, (point) => point.time));

	// Use the limits to create x and y scales
	const x = $derived(
		scaleUtc()
			.domain([minTime ?? now, maxTime ?? now])
			.range([0, mainChartWidth])
	);

	const y = $derived(
		scaleLinear()
			.domain([0, maxValue ?? 0])
			.range([mainChartHeight, 0])
	);

	// Use the scales to create a generator
	/** @type {import("d3-shape").Line<DataPoint>} */
	const lineGenerator = $derived(
		line(
			(point) => x(point.time),
			(point) => y(point.value)
		)
	);

	// Use the generator to create the path commands for our chart
	const d = $derived(lineGenerator(dataPoints));
</script>

<svg viewBox="0 0 {mainChartWidth} {mainChartHeight}">
	<path {d} />
</svg>

<style>
	svg {
		stroke: black;
		stroke-width: 2px;
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>
