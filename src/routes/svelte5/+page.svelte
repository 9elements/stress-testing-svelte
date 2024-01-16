<script>
	import LineChart from './LineChart.svelte';
	import { random, times } from 'lodash-es';
	import { DataPoint } from './datapoint.svelte';

	/**
	 * @param {number} number
	 */
	const generateDataPoints = (number) => {
		const maxNumber = 100 + number;

		const dataPoints = [];

		for (let index = 100; index < maxNumber; index++) {
			const value = random(50);
			const time = new Date(index);

			dataPoints.push(new DataPoint(time, value));
		}

		return dataPoints;
	};

	let numCharts = 10;

	/**
	 * @type {DataPoint[][]}
	 */
	$: charts = times(numCharts).map(() => generateDataPoints(1000));

	const regenerate = () => {
		charts.forEach((chartPoints) => {
			chartPoints.forEach((point) => {
				point.value = random(50);
			});
		});
	};

	let running = false;
	const frame = () => {
		running = true;
		regenerate();
		requestAnimationFrame(() => {
			frame();
		});
	};
</script>

<p>
	{#if !running}
		<button on:click={frame}>Regenerate!</button>
	{/if}

	<label>
		Number of charts ({numCharts}):
		<input type="range" min="10" max="100" step="10" bind:value={numCharts} />
	</label>
</p>

<div class="stack">
	{#each charts as chartDataPoints}
		<LineChart dataPoints={chartDataPoints} />
	{/each}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
	}
</style>
