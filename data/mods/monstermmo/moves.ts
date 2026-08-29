// Moves do projeto. Dois de conteudo, que e o minimo do S0 -- um exclusivo da
// especie propria e um adicionado a uma especie **nativa** pelo scripts.ts --,
// mais UM que nao e conteudo: o move-portador do uso de item (spec S9, D4).
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
};
