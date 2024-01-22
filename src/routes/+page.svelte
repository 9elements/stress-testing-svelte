<script context="module">
	import { generateDataPoints } from '$lib/generateDataPoints';
	import { DataPoint } from './(demos)/svelte5/datapoint.svelte';

	const randomCharts = [...Array(7)].map(() =>
		generateDataPoints(1000, (time, value) => new DataPoint(time, value))
	);
</script>

<script>
	import Arrow from '$lib/Arrow.svelte';
	import LineChart from './(demos)/svelte5/LineChart.svelte';
</script>

<div class="hstack gap-2">
	<div class="vstack gap-2 flex-1">
		<h1>Stress testing Svelte</h1>

		<div class="vstack gap-1">
			<a href="/svelte4" class="button">Svelte 4 Demo <Arrow /></a>
			<a href="/svelte5" class="button">Svelte 5 Demo <Arrow /></a>
		</div>
	</div>

	<div class="vstack flex-2 max-width">
		{#each randomCharts as chart}
			<LineChart dataPoints={chart} />
		{/each}
	</div>
</div>

<style>
	.max-width {
		max-width: 100%;
	}
</style>
