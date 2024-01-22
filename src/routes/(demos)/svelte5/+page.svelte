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

	let numCharts = $state(10);

	/**
	 * @type {DataPoint[][]}
	 */
	const charts = $derived(times(numCharts).map(() => generateDataPoints(1000)));

	const regenerate = () => {
		charts.forEach((chartPoints) => {
			chartPoints.forEach((point) => {
				point.value = random(50);
			});
		});
	};

	let running = $state(false);
	const frame = () => {
		regenerate();

		if (running) {
			requestAnimationFrame(() => {
				frame();
			});
		}
	};

	const toggle = () => {
		running = !running;

		if (running) {
			frame();
		}
	};
</script>

<div class="hstack gap-1 controls">
	<button on:click={toggle}>
		{#if running}
			Stop!
		{:else}
			Start!
		{/if}
	</button>

	<label for="num-charts-control">
		Number of charts ({numCharts}):
	</label>
	<input type="range" id="num-charts-control" min="10" max="100" step="10" bind:value={numCharts} />
</div>

<div class="vstack">
	{#each charts as chartDataPoints}
		<LineChart dataPoints={chartDataPoints} />
	{/each}
</div>

<style>
	.controls {
		justify-content: center;
		align-items: center;
		margin-block-end: 1em;
	}

	.note {
		margin-block-end: 1em;
	}
</style>
