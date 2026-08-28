// Learnset da especie propria. A nativa (pikachu) e estendida pelo init() do
// scripts.ts, que e o caminho para modificar dado herdado sem reescreve-lo.
//
// **Desde o S7 (D5b) esta tabela e DERIVADA.** A fonte da verdade e o mundo:
// `CreatureContent.ConstruirLearnsets`, em C#. O que esta aqui e o espelho
// mantido a mao enquanto for pouca linha -- gerado a partir do C# quando
// deixar de ser, como a ADR-0006 ja preve para o pokedex. Divergencia entre os
// dois e SILENCIOSA (o sim aceita golpe fora do learnset porque nunca chama o
// TeamValidator), e e por isso que a regra tem um dono so.
export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {
	spcferrun: {
		learnset: {
			emberfang: ["9L1"],
			tackle: ["9L1"],
			ember: ["9L5"],
			bite: ["9L10"],
			flamecharge: ["9L15"],
			firefang: ["9L30"],
			flamethrower: ["9L50"],
		},
	},
	spcferrax: {
		learnset: {
			emberfang: ["9L1"],
			bite: ["9L1"],
			tackle: ["9L1"],
			ember: ["9L5"],
			flamecharge: ["9L15"],
			firefang: ["9L30"],
			flamethrower: ["9L50"],
			crunch: ["9L55"],
			flareblitz: ["9L60"],
		},
	},
};
