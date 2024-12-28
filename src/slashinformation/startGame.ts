import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const StartGameCommand = {
	name: "startgame",
	description: "Start a Monopoly game",
	description_localizations: {
		fr: "Debuter une partie"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "players",
			name_localizations: {
				fr: "joueurs"
			},
			description: "Comma-separated list of player names",
			description_localizations: {
				fr: "Liste de joueur , separer par une virgule"
			},
			required:true
		}
	],
	default_member_permissions: "0"
} as const;
