// Learnset das especies do projeto.
//
// **Desde o S7 (D5b) esta tabela e DERIVADA.** A fonte da verdade e o mundo:
// `CreatureContent.ConstruirLearnsets`, em C#. O que esta aqui e o espelho
// mantido a mao enquanto for pouca linha -- gerado a partir do C# quando
// deixar de ser, como a ADR-0006 ja preve para o pokedex. Divergencia entre os
// dois e SILENCIOSA (o sim aceita golpe fora do learnset porque nunca chama o
// TeamValidator), e e por isso que a regra tem um dono so.
//
// **No goal 23 ela ganhou a terceira linha e perdeu o `modData`.** Ate aqui o
// learnset da segunda especie do conteudo era o do `pikachu` HERDADO, estendido
// pelo `init()` do `scripts.ts` com uma linha; com `spcpikachu` sendo nossa, o
// espelho dela mora aqui como o das outras duas -- e os ids de golpe sao os
// proprios (ADR-0015).
export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {
	spcferrun: {
		learnset: {
			spcemberfang: ["9L1"],
			spctackle: ["9L1"],
			spcember: ["9L5"],
			spcbite: ["9L10"],
			spcflamecharge: ["9L15"],
			spcfirefang: ["9L30"],
			spcflamethrower: ["9L50"],
		},
	},
	spcferrax: {
		learnset: {
			spcemberfang: ["9L1"],
			spcbite: ["9L1"],
			spctackle: ["9L1"],
			spcember: ["9L5"],
			spcflamecharge: ["9L15"],
			spcfirefang: ["9L30"],
			spcflamethrower: ["9L50"],
			spccrunch: ["9L55"],
			spcflareblitz: ["9L60"],
		},
	},
	spcpikachu: {
		learnset: {
			spcthunderbolt: ["9L1"],
			spcquickattack: ["9L1"],
			// O `spcstormnip` e a outra metade do que o mod precisa provar desde
			// o S0: nao so registrar conteudo novo, mas **modificar o
			// herdado**. Ate o goal 23 ele entrava por `modData` sobre o
			// `pikachu` do dex base; hoje a especie e nossa, e a prova de
			// "modificar o herdado" passou para a poda do `init()`, que apaga
			// 1.517 especies do dex que o mod recebeu de graca.
			spcstormnip: ["9L1"],
		},
	},
};
