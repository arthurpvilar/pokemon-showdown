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
//
// **Desde o goal 23 TODA especie do conteudo mora aqui** (ADR-0015): o
// `pikachu` do dex base saiu e virou `spcpikachu`, com o dado copiado linha por
// linha. O que sobrou do dex herdado e podado no `init()` do `scripts.ts`, e o
// `IdsDoProjeto` do fim deste arquivo e quem diz o que sobrevive.
export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	spcferrun: {
		// Numero alto para nao colidir com o dex base (~1025) nem com CAP,
		// que usa negativos. E o numero do livro de identificacao, e troca
		// junto com nome e sprite depois do go.
		num: 5001,
		name: "SPC Ferrun",
		types: ["Fire"],
		baseStats: { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 },
		// As duas eram `"Intimidate"` e `"Flash Fire"` -- ids NATIVOS,
		// resolvidos por nome. Viraram proprias no goal 23, com o efeito
		// transcrito em `abilities.ts`.
		abilities: { 0: "SPC Intimidate", H: "SPC Flash Fire" },
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
		abilities: { 0: "SPC Intimidate", H: "SPC Flash Fire" },
		heightm: 1.4,
		weightkg: 62,
		color: "Red",
		eggGroups: ["Field"],
	},
	// A SEGUNDA ESPECIE DO CONTEUDO, e ate o goal 23 ela era o `pikachu` do
	// dex base (ADR-0006 + emenda: ids nativos por compatibilidade maxima).
	// Ela e o slot 1 do `EncounterTables.Catalogo` do mundo -- a de peso 1 na
	// grama, a que faz o sorteio por peso ser exercitado de verdade.
	//
	// **O dado e o do `pikachu`, numero por numero** (lido do fork rodando, e
	// nao de memoria): e isso que faz o save nao mudar um byte. `BaseStats` e
	// `permil_macho` identicos significam `DexGerado` identico, e com ele os
	// 81 dourados do `StatCalculator` continuam valendo sem um numero novo --
	// so o comentario da linha mudou de `// Pikachu` para `// SPC Pikachu`.
	// Ver a ADR-0015.
	//
	// **Nao ha `prevo` nem `evos`**, pelo mesmo motivo do Ferrax -- e tambem
	// porque `prevo: "Pichu"` apontaria para uma especie que a poda apaga.
	// A linha evolutiva do projeto mora na `EvolutionTable` do C#.
	spcpikachu: {
		num: 5003,
		name: "SPC Pikachu",
		types: ["Electric"],
		baseStats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 },
		// `"Static"` era o slot 0 nativo, e e a unica habilidade que esta
		// especie de fato usa (o campo do packed sai vazio e o sim pega a
		// `abilities[0]`). A oculta nativa (`Lightning Rod`) **nao entra**:
		// nada no POC escolhe slot `H`, e portar um efeito inalcancavel seria
		// codigo de terceiro copiado sem consumidor.
		abilities: { 0: "SPC Static" },
		heightm: 0.4,
		weightkg: 6,
		color: "Yellow",
		eggGroups: ["Field", "Fairy"],
	},
};

// ---------------------------------------------------------------------------
// O INSTANTANEO DOS NOSSOS IDS, e ele TEM de ser tirado aqui (goal 23).
//
// `sim/dex.ts:465` (`loadDataFile`) devolve `dataObject[dataType]` -- o objeto
// que este modulo exporta, POR REFERENCIA --, e a mescla de `:717` escreve as
// entradas herdadas DENTRO dele. Ou seja: depois do carregamento,
// `Pokedex` deixou de ser "as nossas" e virou "as 1519". Conferido rodando: um
// `Object.keys(Pokedex)` dentro do `init()` devolve o dex inteiro, comecando
// pelas nossas duas.
//
// Este `Object.keys` roda no corpo do modulo, que e avaliado no `require` --
// antes da mescla. E por isso que ele e a lista das nossas, e e por isso que
// ele mora ao lado da tabela e nao no `scripts.ts`.
export const IdsDoProjeto: readonly string[] = Object.freeze(Object.keys(Pokedex));
