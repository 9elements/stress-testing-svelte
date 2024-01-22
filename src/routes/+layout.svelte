<script>
	import '../css/reset.css';
	import '../css/global.css';
	import '../css/layout.css';
	import '../css/button.css';

	import { page } from '$app/stores';

	/**
	 * @param {string} path
	 */
	const isCurrent = (path) => $page.url.pathname === path;
</script>

<div class="navbar hstack">
	<nav>
		<ul role="list" class="hstack gap-2">
			<li>
				<a href="/" class:active={isCurrent('/')}>Home</a>
			</li>
			<li>
				<a href="/svelte4" class:active={isCurrent('/svelte4')}>Demo 4</a>
			</li>
			<li>
				<a href="/svelte5" class:active={isCurrent('/svelte5')}>Demo 5</a>
			</li>
		</ul>
	</nav>
</div>

<main>
	<slot />
</main>

<style>
	.navbar {
		justify-content: center;
		border-bottom: 2px solid var(--borders);
		margin-block-end: 5em;
	}

	.active {
		font-weight: bold;
	}

	main {
		margin-inline: 1em;
	}
</style>
