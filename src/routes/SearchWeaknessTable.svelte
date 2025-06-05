<script lang="ts">
	let { value = $bindable(''), ...props } = $props();
</script>

<div
	class="search-bar-container"
	style="display: flex; justify-content: center; margin-bottom: 1rem;">
	<input
		type="text"
		placeholder="Search faction or element..."
		bind:value
		class="search-bar"
		{...props} />
</div>

<style>
	.search-bar {
		width: 100%;
		background-color: var(--background-100);
		border: 1px solid var(--background-200);
		border-radius: 4px;
		padding: var(--space-s);
	}
</style>
