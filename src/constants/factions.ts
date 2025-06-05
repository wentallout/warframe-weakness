export type Faction =
	| 'Grineer'
	| 'Kuva Grineer'
	| 'Corpus'
	| 'Amalgam Corpus'
	| 'Infested'
	| 'Deimos Infested'
	| 'Orokin'
	| 'Sentient'
	| 'Narmer'
	| 'Murmur'
	| 'Scaldra'
	| 'Techrot';

export interface FactionInfo {
	name: Faction;
	logo: string; // relative path to logo image
	wikiUrl?: string;
}

export const factionInfoMap: Record<Faction, FactionInfo> = {
	Grineer: {
		name: 'Grineer',
		logo: '/assets/images/factions/Grineer.png',
		wikiUrl: 'https://wiki.warframe.com/w/Grineer'
	},
	'Kuva Grineer': {
		name: 'Kuva Grineer',
		logo: '/assets/images/factions/Grineer.png',
		wikiUrl: 'https://wiki.warframe.com/w/Damage/Kuva_Grineer'
	},
	Corpus: {
		name: 'Corpus',
		logo: '/assets/images/factions/Corpus.png',
		wikiUrl: 'https://wiki.warframe.com/w/Corpus'
	},
	'Amalgam Corpus': {
		name: 'Amalgam Corpus',
		logo: '/assets/images/factions/Corpus.png',
		wikiUrl: 'https://wiki.warframe.com/w/Amalgam#Corpus_Amalgams'
	},
	Infested: {
		name: 'Infested',
		logo: '/assets/images/factions/Infested.svg',
		wikiUrl: 'https://wiki.warframe.com/w/Infested'
	},
	'Deimos Infested': {
		name: 'Deimos Infested',
		logo: '/assets/images/factions/Infested.svg',
		wikiUrl: 'https://wiki.warframe.com/w/Damage/Infested_Deimos'
	},
	Orokin: {
		name: 'Orokin',
		logo: '/assets/images/factions/Orokin.png',
		wikiUrl: 'https://wiki.warframe.com/w/Corrupted'
	},
	Sentient: {
		name: 'Sentient',
		logo: '/assets/images/factions/Sentient.png',
		wikiUrl: 'https://wiki.warframe.com/w/Sentient'
	},
	Narmer: {
		name: 'Narmer',
		logo: '/assets/images/factions/Narmer.png',
		wikiUrl: 'https://wiki.warframe.com/w/Narmer'
	},
	Murmur: {
		name: 'Murmur',
		logo: '/assets/images/factions/Murmur.png',
		wikiUrl: 'https://wiki.warframe.com/w/The_Murmur'
	},
	Scaldra: {
		name: 'Scaldra',
		logo: '/assets/images/factions/Scaldra.png',
		wikiUrl: 'https://wiki.warframe.com/w/Scaldra'
	},
	Techrot: {
		name: 'Techrot',
		logo: '/assets/images/factions/Techrot.png',
		wikiUrl: 'https://wiki.warframe.com/w/Techrot'
	}
};
