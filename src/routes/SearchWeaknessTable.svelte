<script lang="ts">
	let { value = $bindable(''), ...props } = $props();
</script>

<input
	type="text"
	placeholder="Search faction or element..."
	bind:value
	class="search-bar"
	{...props} />

<style>
	.search-bar {
		width: 100%;
		background-color: var(--background-100);
		border: 1px solid var(--background-200);
		border-radius: 4px;
		padding: var(--space-s);
		margin-bottom: var(--space-s);
	}
</style>
