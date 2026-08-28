// Especies do projeto. Ver ADR-0006: no POC o dado e real e a identidade e
// temporaria -- o que e definitivo aqui e o **id** e o fato de a especie ser
// registrada no mod, e nao herdada do dex base.
//
// Duas regras do Showdown que o prefixo do projeto tem de respeitar, ambas
// descobertas rodando:
//
//  1. `toID` (sim/dex-data.ts:28) faz `replace(/[^a-z0-9]+/g, '')`, entao
//     "spc_ferrun" nunca seria encontrado -- o underscore some. A chave e
//     `spcferrun`.
//  2. **A chave tem de ser `toID(name)`.** Chave `spcferrun` com nome "Ferrun"
//     compila e carrega, mas estoura em batalha com "Unidentified species:
//     ferrun": `dex.species.get` normaliza o nome antes de indexar
//     (sim/dex-species.ts:426), e "Ferrun" normaliza para `ferrun`. Por isso o
//     nome carrega o prefixo tambem -- "SPC Ferrun" -> `spcferrun`.
//
// O prefixo, portanto, vive no nome, nao so no id. Ele e placeholder de POC e
// sai junto com a identidade (ADR-0006).
export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	spcferrun: {
		// Numero alto para nao colidir com o dex base (~1025) nem com CAP,
		// que usa negativos. E o numero do livro de identificacao, e troca
		// junto com nome e sprite depois do go.
		num: 5001,
		name: "SPC Ferrun",
		types: ["Fire"],
		baseStats: { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 },
		abilities: { 0: "Intimidate", H: "Flash Fire" },
		heightm: 0.7,
		weightkg: 19,
		color: "Red",
		eggGroups: ["Field"],
	},
	// O estagio evoluido do SPC Ferrun (spec S7, D5). Quem decide QUANDO a
	// evolucao acontece e o mundo (`CreatureContent.ConstruirEvolucoes`, em
	// C#) -- o sim so precisa saber que a especie existe, porque o time
	// empacotado passa a cita-la depois que o jogador evolui. Nao ha `prevo`
	// nem `evos` de proposito: seriam uma segunda descricao da mesma regra, e
	// o D5 poe a regra num dono so.
	spcferrax: {
		num: 5002,
		name: "SPC Ferrax",
		types: ["Fire", "Dark"],
		baseStats: { hp: 80, atk: 105, def: 70, spa: 95, spd: 75, spe: 90 },
		abilities: { 0: "Intimidate", H: "Flash Fire" },
		heightm: 1.4,
		weightkg: 62,
		color: "Red",
		eggGroups: ["Field"],
	},
};
