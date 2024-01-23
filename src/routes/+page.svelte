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
		<section>
			<h1>Stress testing Svelte</h1>

			<p>
				This is a companion site for the article
				<a href="https://9elements.com/blog">
					<i>Stress testing Svelte until your browser breaks down crying</i>
				</a>. It tries to show the perceivable performance improvements that are gained in Svelte 5.
				This website is using the
				<i>5.0.0-next.37</i>
				version of Svelte but the Svelte 4 demo is still written in the "old"
				<i>compile-time-reactivity</i> style.
			</p>
		</section>

		<div class="vstack gap-1">
			<a href="/svelte4" class="button">Svelte 4 Demo <Arrow /></a>
			<a href="/svelte5" class="button">Svelte 5 Demo <Arrow /></a>
		</div>
	</div>

	<div class="vstack flex-1 randomness">
		{#each randomCharts as chart}
			<LineChart dataPoints={chart} />
		{/each}
	</div>
</div>

<style>
	.randomness {
		flex-basis: 20rem;
	}
</style>
