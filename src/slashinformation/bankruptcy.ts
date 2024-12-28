import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const BankruptCommand = {
	name: "bankrupt",
	description: "Declare bankruptcy",
	description_localizations: {
		fr: "Declarer fahite"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "toPlayers",
			name_localizations: {
				fr: "auJoueurs"
			},
			description: "Comma-separated list of players to share assets with",
			description_localizations: {
				fr: "Liste de joueur , separer par une virgule , que vous voulez donner vos biens"
			},
			required:true
		}
	],
	default_member_permissions: "0"
} as const;
