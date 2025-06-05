import type { Faction } from './factions';

export type DamageType =
	| 'Impact'
	| 'Puncture'
	| 'Slash'
	| 'Heat'
	| 'Cold'
	| 'Electricity'
	| 'Toxin'
	| 'Blast'
	| 'Corrosive'
	| 'Gas'
	| 'Magnetic'
	| 'Radiation'
	| 'Viral';

type FactionDamageProfile = {
	weakTo: DamageType[];
	resists: DamageType[];
};

export const damageWeaknessChart: Record<Faction, FactionDamageProfile> = {
	Grineer: {
		weakTo: ['Impact', 'Corrosive'],
		resists: []
	},
	'Kuva Grineer': {
		weakTo: ['Impact', 'Corrosive'],
		resists: ['Heat']
	},
	Corpus: {
		weakTo: ['Puncture', 'Magnetic'],
		resists: []
	},
	'Amalgam Corpus': {
		weakTo: ['Electricity', 'Magnetic'],
		resists: ['Blast']
	},
	Infested: {
		weakTo: ['Slash', 'Heat'],
		resists: []
	},
	'Deimos Infested': {
		weakTo: ['Blast', 'Gas'],
		resists: ['Viral']
	},
	Orokin: {
		weakTo: ['Puncture', 'Viral'],
		resists: ['Radiation']
	},
	Sentient: {
		weakTo: ['Cold', 'Radiation'],
		resists: ['Corrosive']
	},
	Narmer: {
		weakTo: ['Slash', 'Toxin'],
		resists: ['Magnetic']
	},
	Murmur: {
		weakTo: ['Electricity', 'Radiation'],
		resists: ['Viral']
	},
	Scaldra: {
		weakTo: ['Impact', 'Corrosive'],
		resists: ['Gas']
	},
	Techrot: {
		weakTo: ['Gas', 'Magnetic'],
		resists: ['Cold']
	}
};
