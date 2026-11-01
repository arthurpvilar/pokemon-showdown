// Habilidades do projeto (goal 23, ADR-0006 + ADR-0015).
//
// Elas existem porque o goal 23 pede que **todo id de especie, golpe e
// habilidade que o conteudo do POC usa seja proprio**, e as especies do mod
// declaravam `"Intimidate"`, `"Flash Fire"` e (pelo `pikachu` herdado)
// `"Static"` -- tres ids NATIVOS, resolvidos por nome pelo
// `dex.abilities.get` (sim/dex-abilities.ts).
//
// **O EFEITO E COPIADO LINHA POR LINHA, e isso e requisito do goal**: "nenhuma
// regra de jogo muda". O que muda e o id e o nome; a mecanica e a mesma do
// `data/abilities.ts`, lida de la e transcrita aqui -- o fork so e LIDO
// (invariante 4).
//
// **POR QUE TRANSCRITO, E NAO ESPALHADO (`{...base.flashfire}`):** o `flashfire`
// referencia o PROPRIO ID por string dentro dos handlers
// (`addVolatile('flashfire')`, `hasAbility('flashfire')`), e as linhas de log
// citam o nome nativo (`this.add('-ability', pokemon, 'Intimidate', 'boost')`).
// Espalhar o objeto base carregaria as duas coisas: o volatil procuraria uma
// condicao que nao existe sob o nosso id, e o nome nativo vazaria para o log do
// sim. Transcrever e o unico jeito de o id ser nosso ATE DENTRO do efeito.
//
// As duas regras do `toID` valem aqui como valem para especie e golpe: a chave
// e `toID(name)`, e o prefixo mora no nome tambem (`"SPC Intimidate"` ->
// `spcintimidate`).
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// `Intimidate` (num 22). Slot 0 do SPC Ferrun e do SPC Ferrax, e por isso a
	// unica habilidade que o POC de fato EXERCITA hoje: o campo de habilidade
	// do packed sai vazio (`AbilityIds.SpeciesDefault`), e o sim entao usa a
	// `abilities[0]` da especie.
	spcintimidate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'SPC Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ atk: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "SPC Intimidate",
		rating: 3.5,
		num: 5001,
	},

	// `Flash Fire` (num 18). Habilidade OCULTA das duas especies da linha do
	// Ferrun -- inalcancavel no POC, porque nada escolhe slot `H`. Ela entra
	// por fidelidade de dado: a especie sempre declarou duas, e tirar uma
	// seria mudar o conteudo em vez de migrar o id.
	//
	// As tres strings `spcflashfire` dentro dos handlers sao o id NOVO de
	// proposito -- ver o cabecalho.
	spcflashfire: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('spcflashfire')) {
					this.add('-immune', target, '[from] ability: SPC Flash Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('spcflashfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: SPC Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('spcflashfire')) {
					this.debug('SPC Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('spcflashfire')) {
					this.debug('SPC Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: SPC Flash Fire', '[silent]');
			},
		},
		flags: { breakable: 1 },
		name: "SPC Flash Fire",
		rating: 3.5,
		num: 5002,
	},

	// `Static` (num 9). Slot 0 do SPC Pikachu, e **exercitada**: a segunda
	// especie do conteudo entra em batalha com ela ativa.
	spcstatic: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		flags: {},
		name: "SPC Static",
		rating: 2,
		num: 5003,
	},
};
