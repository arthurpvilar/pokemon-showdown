import { IdsDoProjeto } from './pokedex';

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,

	init() {
		const nossas = new Set(IdsDoProjeto);
		let podadas = 0;
		for (const id in this.data.Pokedex) {
			if (!nossas.has(id)) {
				delete this.data.Pokedex[id];
				podadas++;
			}
		}
		console.log(`[poda] especies removidas: ${podadas}; restam ${Object.keys(this.data.Pokedex).length}`);

		this.modData('Learnsets', 'pikachu').learnset.stormnip = ['9L1'];
	},
};
