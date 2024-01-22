<script>
	import { extent, max } from 'd3-array';
	import { scaleLinear, scaleUtc } from 'd3-scale';
	import { line } from 'd3-shape';

	/** @type {{time: Date, value: number}[]} */
	export let dataPoints;
	export let now = new Date();
	export let mainChartWidth = 800;
	export let mainChartHeight = 100;

	// Calculate the limits of our input data
	$: maxValue = max(dataPoints, (point) => point.value);
	$: [minTime, maxTime] = extent(dataPoints, (point) => point.time);

	// Use the limits to create x and y scales
	$: x = scaleUtc()
		.domain([minTime ?? now, maxTime ?? now])
		.range([0, mainChartWidth]);

	$: y = scaleLinear()
		.domain([0, maxValue ?? 0])
		.range([mainChartHeight, 0]);

	// Use the scales to create a generator
	/** @type {import("d3-shape").Line<{time: Date, value: number}>} */
	$: lineGenerator = line(
		(point) => x(point.time),
		(point) => y(point.value)
	);

	// Use the generator to create the path commands for our chart
	$: d = lineGenerator(dataPoints);
</script>

<svg viewBox="0 0 {mainChartWidth} {mainChartHeight}">
	<path {d} />
</svg>

<style>
	svg {
		stroke: black;
		stroke-width: 0.1em;
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>
