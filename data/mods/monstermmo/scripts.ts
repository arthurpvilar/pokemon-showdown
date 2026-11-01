// `inherit` omitido de proposito: sim/dex.ts:686 faz `Scripts.inherit ||
// 'base'`, entao o mod herda o dex atual inteiro. **Nao ha como um mod nascer
// vazio** -- consequencia registrada na ADR-0006, e e por isso que a poda e
// codigo e nao configuracao.
import { IdsDoProjeto } from './pokedex';

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,

	init() {
		// ---------------------------------------------------------------
		//  A PODA DO DEX HERDADO (goal 23, ADR-0006 "Consequencias" no 4)
		// ---------------------------------------------------------------
		//
		// A ADR-0006 escreveu em 2026-08-25 que a troca de identidade "nao e
		// so cosmetica: ela inclui podar o dex base herdado -- que, pelo
		// `sim/dex.ts:686`, nao some sozinho". Este laco e isso.
		//
		// **O conjunto vem do `IdsDoProjeto`, e nao de um `Object.keys` aqui**,
		// e o motivo esta escrito ao lado dele no `pokedex.ts`: neste ponto a
		// mescla ja rodou, e `this.data.Pokedex` tem as nossas MAIS o dex
		// inteiro. A lista das nossas so existe antes da mescla.
		//
		// **Poda-se o `Pokedex` e nada mais.** `Moves`, `Abilities` e
		// `Learnsets` herdados ficam de pe de proposito: o conteudo nao os
		// cita mais (goal 23 -- todo id de golpe e de habilidade do conteudo e
		// proprio), e o sim ainda os alcanca por efeito -- `twoturnmove`,
		// `flinch`, `confusion`, `par`, `brn` e a propria Struggle sao
		// entradas do dex base que uma batalha nossa usa a cada turno. Podar
		// movimento seria quebrar o motor para provar um ponto sobre
		// identidade.
		const nossas = new Set(IdsDoProjeto);
		let podadas = 0;
		for (const id in this.data.Pokedex) {
			if (!nossas.has(id)) {
				delete this.data.Pokedex[id];
				podadas++;
			}
		}

		// A linha de log e requisito do goal ("o numero de podadas sai no
		// log"), e ela diz os DOIS numeros: sem o "restam", uma poda que
		// apagasse tudo -- inclusive as nossas -- sairia com o mesmo texto
		// tranquilizador.
		console.log(`[poda] especies removidas: ${podadas}; restam ${Object.keys(this.data.Pokedex).length}`);
	},
};
