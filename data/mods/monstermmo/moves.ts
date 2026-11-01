// Moves do projeto. Dois de conteudo, que e o minimo do S0 -- um exclusivo da
// especie propria e um que o learnset de outra especie cita --, mais UM que nao
// e conteudo: o move-portador do uso de item (spec S9, D4).
//
// **O goal 23 fez duas coisas aqui** (ADR-0015): os catorze golpes que o
// conteudo pedia ao dex base viraram ids proprios (o bloco do fim deste
// arquivo), e os dois que **ja eram** nossos ganharam o prefixo que lhes
// faltava -- `emberfang` -> `spcemberfang`, `stormnip` -> `spcstormnip`. Com
// isso o unico id deste arquivo sem `spc` e o `monstermmoitem`, e ele e
// **maquinaria e nao conteudo**: nenhuma criatura o aprende, nenhum catalogo o
// lista, e o cliente nunca o ve.
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	spcemberfang: {
		num: 5001,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "SPC Ember Fang",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: { chance: 10, status: 'brn' },
		target: "normal",
		type: "Fire",
	},
	spcstormnip: {
		num: 5002,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "SPC Storm Nip",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: { chance: 20, status: 'par' },
		target: "normal",
		type: "Electric",
	},
	/**
	 * O **move-portador** do uso de item dentro da batalha (spec S9, D4,
	 * reescrito no passe `10a`).
	 *
	 * Ele nao e um golpe: e a **acao do treinador**. A gramatica de escolha do
	 * sim e `move | switch | shift | team | pass` e nao tem "usar item"
	 * (`sim/side.ts`), e `pass` e ilegal para ativo consciente -- entao a unica
	 * forma de usar item **consumir o turno** e responder o request com uma
	 * choice de `move`, e choice de move exige o move no moveset. O servico
	 * anexa este id ao fim do moveset de cada criatura de lado humano em
	 * formato selvagem (5o slot), e o cliente **nunca o ve**: os tres filtros
	 * do adapter o descartam do request, do `battle.init` e do log.
	 *
	 * **Efeito nenhum, de proposito.** O valor do item (quanto a pocao cura)
	 * mora na tabela do mundo e viaja no `ctl.itemEffect`; um move por item
	 * seria a segunda fonte de verdade que o D1 recusou. O efeito ja foi
	 * aplicado por `>editbattle` quando este move resolve -- ele existe para
	 * **gastar o turno**, e nada mais.
	 *
	 * **`pp: 0` com `noPPBoosts` e desenho tres vezes** (`sim/battle.ts`
	 * `calculatePP` devolve `move.pp` cru quando `noPPBoosts`, entao o slot
	 * nasce 0/0):
	 *   (a) Struggle continua existindo -- com os 4 golpes reais zerados,
	 *       `getMoves` nao acha golpe valido e o request vira Struggle, em vez
	 *       de o portador prender a batalha num loop de "usar nada";
	 *   (b) `default` nunca o escolhe -- timeout de escolha continua gastando
	 *       um golpe real;
	 *   (c) nao ha teto de usos -- no uso, o servico escreve
	 *       `>editbattle pp <lado>, <criatura>, monstermmoitem, 1` e a choice
	 *       deduz de volta a zero. Duas linhas por uso, as duas no `inputLog`,
	 *       e o replay do 5.6 continua fiel.
	 *
	 * `priority: 6` e o bracket de item do genero; no fluxo do POC ele e
	 * **cosmetico** -- a cura ja foi aplicada por `>editbattle` antes da choice.
	 * `target: "self"` e `category: "Status"` sao o que faz ele resolver em
	 * silencio: sem `boosts`, `status`, `heal` nem `volatileStatus`,
	 * `runMoveEffects` cai no ramo "didn't fail because it didn't try to do
	 * anything" e nao emite `-fail`.
	 */
	monstermmoitem: {
		num: 5003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "MonsterMMO Item",
		pp: 0,
		noPPBoosts: true,
		priority: 6,
		flags: {},
		secondary: null,
		target: "self",
		type: "Normal",
	},

	// =====================================================================
	//  OS CATORZE DO GOAL 23 -- os golpes do conteudo que eram NATIVOS
	// =====================================================================
	//
	// O goal 23 (ADR-0006 + ADR-0015) pede que todo id de golpe do conteudo
	// seja proprio. Estes catorze eram `spctackle`, `ember`, `bite`,
	// `flamecharge`, `thunderbolt`, `quickattack`, `firefang`,
	// `flamethrower`, `crunch`, `flareblitz`, `cut`, `dig`, `surf` e
	// `rockclimb` -- ids do dex base, citados pelo `MoveIds.Nomes` do mundo.
	//
	// **O id novo e `spc` + o id velho, e o nome e `"SPC "` + o nome velho.**
	// A regra nao e estetica, e as duas metades dela foram descobertas
	// rodando (CLAUDE.md da raiz): o `toID` apaga tudo que nao e `[a-z0-9]`,
	// e a CHAVE TEM DE SER `toID(name)` -- entao o prefixo mora no nome
	// tambem, exatamente como em `"SPC Ferrun"` -> `spcferrun`. Derivar o id
	// do id velho em vez de inventar nome e decisao: **nome de exibicao e o
	// goal 24**, e este goal nao inventa conteudo.
	//
	// **O DADO E COPIADO LINHA POR LINHA do `data/moves.ts`, e isso e
	// requisito: "nenhuma regra de jogo muda".** Poder, PP, tipo, categoria,
	// flags, secundarias e recuo sao os mesmos numeros; o fork so foi LIDO
	// (invariante 4). O unico campo que muda de valor e o `num` -- ele e o
	// numero do livro de identificacao, temporario pela ADR-0006, e vai para
	// a faixa 5101+ para nao colidir com o dex base.
	//
	// **`isNonstandard` SAI.** `cut` nasceu `"Unobtainable"` e `rockclimb`
	// `"Past"` no dex base; os nossos sao conteudo corrente do jogo. O campo
	// nao muda uma linha de batalha (o `TeamValidator` nunca e chamado -- a
	// duvida 3 da S19, provada rodando no goal 29), e por isso tira-lo nao e
	// mudanca de regra: e parar de declarar uma restricao que nao e nossa.

	spctackle: {
		num: 5101,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "SPC Tackle",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},

	spcember: {
		num: 5102,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "SPC Ember",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cute",
	},

	spcbite: {
		num: 5103,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "SPC Bite",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},

	spcflamecharge: {
		num: 5104,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "SPC Flame Charge",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},

	spcthunderbolt: {
		num: 5105,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "SPC Thunderbolt",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},

	spcquickattack: {
		num: 5106,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "SPC Quick Attack",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},

	spcfirefang: {
		num: 5107,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "SPC Fire Fang",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},

	spcflamethrower: {
		num: 5108,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "SPC Flamethrower",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},

	spccrunch: {
		num: 5109,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "SPC Crunch",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},

	spcflareblitz: {
		num: 5110,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "SPC Flare Blitz",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, defrost: 1, metronome: 1 },
		recoil: [33, 100],
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},

	// --- os quatro de campo (spec S19, D4) -------------------------------
	//
	// Eles eram a maior divida de id do conteudo: `cut`, `dig`, `surf` e
	// `rockclimb` sao os quatro que a `FieldMoveTable` liga a uma
	// CAPACIDADE, e os quatro eram nativos.

	spccut: {
		num: 5111,
		accuracy: 95,
		basePower: 50,
		category: "Physical",
		name: "SPC Cut",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},

	// **O UNICO dos catorze com handler, e ele e seguro sob id novo porque
	// endereca pelo `move.id` e nunca por string literal.** O `twoturnmove`
	// do `data/conditions.ts` adiciona `effect.id` como volatil -- ou seja,
	// `spcdig` --, e `dex.conditions.get('spcdig')` resolve no `condition`
	// deste objeto. Isso nao e leitura de codigo: a `CiGuardTests` do lado do
	// mundo nao alcanca o sim, entao quem prova e a suite `sim/` do servico,
	// que luta uma batalha com ele.
	spcdig: {
		num: 5112,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "SPC Dig",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1, charge: 1, protect: 1, mirror: 1,
			nonsky: 1, metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1,
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},

	spcsurf: {
		num: 5113,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "SPC Surf",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1 },
		target: "allAdjacent",
		type: "Water",
		contestType: "Beautiful",
	},

	spcrockclimb: {
		num: 5114,
		accuracy: 85,
		basePower: 90,
		category: "Physical",
		name: "SPC Rock Climb",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
};
