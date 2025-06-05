<script lang="ts">
	import { damageWeaknessChart } from '../constants/damage-types';
	import SearchWeaknessTable from './SearchWeaknessTable.svelte';
	import { factionInfoMap } from '../constants/factions';
	import type { Faction } from '../constants/factions';

	type FactionProfile = {
		weakTo: string[];
		resists: string[];
	};

	let factions = $state<[string, FactionProfile][]>(Object.entries(damageWeaknessChart));
	const maxWeaknesses = Math.max(...factions.map(([_, p]) => p.weakTo.length));
	const maxResists = Math.max(...factions.map(([_, p]) => p.resists.length));

	let sortColumn: string | null = null;
	let sortDirection: 'asc' | 'desc' = 'asc';

	import type { DamageType } from '../constants/damage-types';
	let hoveredType = $state<DamageType | null>(null);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

	// Svelte 5 runes for search
	let searchTerm = $state('');
	let filteredFactions = $derived.by(() => {
		return factions.filter(([faction, profile]) => {
			if (!searchTerm.trim()) return true;
			const term = searchTerm.trim().toLowerCase();
			if (faction.toLowerCase().includes(term)) return true;
			if (profile.weakTo.some((w) => w.toLowerCase().includes(term))) return true;
			if (profile.resists.some((r) => r.toLowerCase().includes(term))) return true;
			return false;
		});
	});

	function handleHoverStart(type: DamageType | null) {
		if (hoverTimeout) clearTimeout(hoverTimeout);
		hoverTimeout = setTimeout(() => {
			hoveredType = type;
		}, 250);
	}

	function handleHoverEnd() {
		if (hoverTimeout) clearTimeout(hoverTimeout);
		hoverTimeout = null;
		hoveredType = null;
	}

	function sortTable(column: string) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
		factions = [...factions].sort((a, b) => {
			const getValue = (entry: any) => {
				if (column.startsWith('weakTo')) return entry[1].weakTo[parseInt(column.slice(-1))] || '';
				if (column.startsWith('resists')) return entry[1].resists[parseInt(column.slice(-1))] || '';
				return '';
			};
			const valA = getValue(a).toLowerCase();
			const valB = getValue(b).toLowerCase();
			if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
			if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}

	function getHighlightedHTML(text: string, term: string): string {
		if (!term.trim() || !text) {
			return text;
		}
		const cleanTerm = term.trim();
		// Escape regex special characters in the search term
		const escapedTerm = cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const regex = new RegExp(`(${escapedTerm})`, 'gi');
		return text.replace(regex, '<span class="search-highlight">$1</span>');
	}
</script>

<SearchWeaknessTable bind:value={searchTerm} />

<section class="weakness-table">
	<div class="weakness-table__scroll-wrapper">
		<table class="weakness-table__table">
			<thead class="weakness-table__head">
				<tr class="weakness-table__row weakness-table__row--header">
					<th class="weakness-table__cell weakness-table__cell--header">Faction</th>
					{#each Array(maxWeaknesses) as _, i (i)}
						<th
							class="weakness-table__cell weakness-table__cell--header weakness-table__cell--header-weakness">
							Weakness {i + 1}
							{#if i < 2}
								<button class="weakness-table__sort-btn" onclick={() => sortTable(`weakTo${i}`)}>
									⇅
								</button>
							{/if}
						</th>
					{/each}
					{#each Array(maxResists) as _, i (i)}
						<th
							class="weakness-table__cell weakness-table__cell--header weakness-table__cell--header-resistance">
							Resistance {i + 1}
							{#if i === 0}
								<button class="weakness-table__sort-btn" onclick={() => sortTable(`resists${i}`)}>
									⇅
								</button>
							{/if}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="weakness-table__body">
				{#each filteredFactions as [faction, profile] (faction)}
					<tr class="weakness-table__row">
						<td
							class="weakness-table__cell weakness-table__cell--faction"
							class:weakness-table__cell--faction-highlight={hoveredType &&
								profile.weakTo.includes(hoveredType)}
							class:weakness-table__cell--faction-dim={hoveredType &&
								!profile.weakTo.includes(hoveredType) &&
								!profile.resists.includes(hoveredType)}>
							{#if factionInfoMap[faction]?.logo}
								<img
									src={factionInfoMap[faction as Faction].logo}
									alt={faction + ' logo'}
									class="weakness-table__icon" />
							{/if}
							<a target="_blank" href={factionInfoMap[faction as Faction].wikiUrl}>
								<span class="weakness-table__cell-content">
									{@html getHighlightedHTML(faction, searchTerm)}
								</span>
							</a>
						</td>
						{#each Array(maxWeaknesses) as _, i (faction + '-weak-' + i)}
							<td
								class="weakness-table__cell weakness-table__cell--weakness"
								class:weakness-table__cell--highlight={hoveredType &&
									profile.weakTo[i] === hoveredType}
								class:weakness-table__cell--dim={hoveredType &&
									profile.weakTo[i] &&
									profile.weakTo[i] !== hoveredType}
								onmouseenter={() => profile.weakTo[i] && handleHoverStart(profile.weakTo[i])}
								onmouseleave={handleHoverEnd}>
								{#if profile.weakTo[i]}
									<img
										src={`/assets/images/damage-types/${profile.weakTo[i]}.png`}
										alt={profile.weakTo[i]}
										class="weakness-table__icon" />
									<span class="weakness-table__type-text weakness-table__cell-content">
										{@html getHighlightedHTML(profile.weakTo[i], searchTerm)}
									</span>
								{/if}
							</td>
						{/each}
						{#each Array(maxResists) as _, i (faction + '-resist-' + i)}
							<td
								class="weakness-table__cell weakness-table__cell--resistance"
								class:weakness-table__cell--highlight={hoveredType &&
									profile.resists[i] === hoveredType}
								class:weakness-table__cell--dim={hoveredType &&
									profile.resists[i] &&
									profile.resists[i] !== hoveredType}
								onmouseenter={() => profile.resists[i] && handleHoverStart(profile.resists[i])}
								onmouseleave={handleHoverEnd}>
								{#if profile.resists[i]}
									<img
										src={`/assets/images/damage-types/${profile.resists[i]}.png`}
										alt={profile.resists[i]}
										class="weakness-table__icon" />
									<span class="weakness-table__type-text weakness-table__cell-content">
										{@html getHighlightedHTML(profile.resists[i], searchTerm)}
									</span>
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.weakness-table {
		display: flex;
		justify-content: center;
		border-radius: var(--space-m);
	}

	.weakness-table__table {
		border-collapse: collapse;
		width: 100%;
		max-width: 100%;
		color: var(--text-900);
		overflow-x: auto;
		border: 1px solid var(--background-200);
		table-layout: fixed;
	}

	.weakness-table__head {
		background-color: var(--background-200);
	}
	.weakness-table__body {
	}

	.weakness-table__row {
		transition: background 0.3s;
	}
	.weakness-table__row--header {
	}

	.weakness-table__scroll-wrapper {
		overflow-x: auto;
		width: 100%;
	}

	.weakness-table__cell {
		padding: var(--space-s) var(--space-s);
		text-align: left;
		border-bottom: 1px solid var(--background-200);
		width: max-content;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: clip;
		position: relative;
		max-width: 220px;
	}

	.weakness-table__cell--faction {
		width: max-content;
		max-width: 280px;
		border-right: 1px solid var(--background-200);
	}

	.weakness-table__cell-content {
		display: block;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		position: relative;
	}

	.weakness-table__cell--dim {
		opacity: 0.2;
		filter: grayscale(0.7);
	}
	.weakness-table__cell--faction-highlight,
	.weakness-table__cell--highlight {
		background: color-mix(in srgb, var(--primary-400, #8f528f) 20%, transparent);
		box-shadow: 0 0 var(--space-l) var(--primary-400, #8f528fcc);
		transition:
			background 0.2s,
			box-shadow 0.2s;
	}
	.weakness-table__cell--faction-dim {
		opacity: 0.2;
		filter: grayscale(0.7);
	}
	.weakness-table__icon {
		height: 24px;
		width: 24px;
		vertical-align: middle;
		margin-right: var(--space-2xs);
		display: inline-block;
	}
	.weakness-table__type-text {
		display: none;
	}

	@media (min-width: 768px) {
		.weakness-table__type-text {
			display: inline;
		}
	}

	.weakness-table__sort-btn {
		background: none;
		border: none;
		margin-left: var(--space-xs);
		cursor: pointer;
		transition: color 0.2s;
	}
	.weakness-table__sort-btn:hover {
		color: var(--accent-700);
	}

	.weakness-table__cell--resistance {
		color: var(--accent-500);
		background-image: url('/assets/images/shield.svg');
		background-repeat: repeat;
		background-size: 32px 32px;

		position: relative;
		z-index: 0;
	}
	.weakness-table__cell--resistance::before {
		content: '';
		position: absolute;
		inset: 0;
		background: inherit;
		opacity: 0.3;
		z-index: 1;
		pointer-events: none;
	}
	.weakness-table__cell--resistance > * {
		position: relative;
		z-index: 2;
	}

	.weakness-table__cell--faction img {
		position: absolute;
		opacity: 0.3;
		right: 16px;
		top: 50%;
		bottom: 50%;
		transform: translate(50%, -50%);
		height: 32px;
		width: 32px;
	}

	.weakness-table__cell--faction {
		font-weight: 600;
		transition: ease 0.3s;

		&:hover {
			text-decoration: underline;
			color: var(--primary-500);
		}
	}

	.weakness-table__cell--resistance .weakness-table__icon {
		filter: invert(1);
	}

	:global(.search-highlight) {
		background-color: var(--primary-300);
		color: var(--text-900);
		font-weight: 600;
	}
</style>
