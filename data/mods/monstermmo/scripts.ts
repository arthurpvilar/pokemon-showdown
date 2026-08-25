// `inherit` omitido de proposito: sim/dex.ts:686 faz `Scripts.inherit ||
// 'base'`, entao o mod herda o dex atual inteiro. Nao ha como um mod nascer
// vazio -- consequencia registrada na ADR-0006 e no backlog, junto com a poda
// que a distribuicao vai exigir.
export const Scripts: ModdedBattleScriptsData = {
	gen: 9,

	init() {
		// Estender especie nativa e a outra metade do que o mod precisa provar:
		// nao so registrar conteudo novo, mas modificar o herdado.
		this.modData('Learnsets', 'pikachu').learnset.stormnip = ['9L1'];
	},
};
