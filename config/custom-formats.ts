// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
//
// Ponto de extensao do proprio upstream, nao hack do fork: DexFormats.load()
// (sim/dex-formats.ts) faz require('../config/custom-formats') tolerando
// ausencia do arquivo, e o cabecalho de config/formats.ts instrui literalmente
// a cria-lo. Delta versus upstream = este arquivo + 1 linha de .gitignore.
// Ver ADR-0001.

export const Formats: import('../sim/dex-formats').FormatList = [
	{
		section: "MonsterMMO",
	},
	{
		// Caso 2 do plano (5.1): PvP 1v1 entre dois jogadores.
		name: "monstermmo-pvp",
		mod: 'monstermmo',
		searchShow: false,
		debug: true,
		ruleset: ['Cancel Mod', 'Max Team Size = 6', 'Max Level = 100', 'Default Level = 50'],
	},
	{
		// Caso 3: encontro selvagem, 1vN assimetrico. O tamanho de time
		// assimetrico e regra de formato, nao de codigo.
		name: "monstermmo-wild",
		mod: 'monstermmo',
		searchShow: false,
		debug: true,
		ruleset: ['Cancel Mod', 'Max Team Size = 6', 'Max Level = 100', 'Default Level = 50'],
	},
	{
		// Caso 4: NPC x NPC, resolvido no servidor sem cliente humano.
		name: "monstermmo-npc",
		mod: 'monstermmo',
		searchShow: false,
		debug: true,
		ruleset: ['Cancel Mod', 'Max Team Size = 6', 'Max Level = 100', 'Default Level = 50'],
	},
];
