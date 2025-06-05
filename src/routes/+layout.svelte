<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../styles/global.css';
	import '@fontsource-variable/inter';
	let { children } = $props();
</script>

<NavBar />

<main class="u-container">
	{@render children?.()}
</main>

<Footer />

<style>
	main {
		margin-bottom: var(--space-m);
	}
</style>
