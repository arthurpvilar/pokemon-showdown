// Moves do projeto. Dois, que e o minimo do S0: um exclusivo da especie
// propria, e um que e adicionado a uma especie **nativa** pelo scripts.ts --
// os dois lados do que um mod precisa saber fazer.
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	emberfang: {
		num: 5001,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Ember Fang",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: { chance: 10, status: 'brn' },
		target: "normal",
		type: "Fire",
	},
	stormnip: {
		num: 5002,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Storm Nip",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: { chance: 20, status: 'par' },
		target: "normal",
		type: "Electric",
	},
};
