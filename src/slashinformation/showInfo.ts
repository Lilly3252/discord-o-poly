import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const ShowInfoCommand = {
	name: "'showinfo",
	description: "Displays player information.",
	description_localizations: {
		fr: "Affiche les information du joueur selectioner"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "userid",
			name_localizations: {
				fr: "ID"
			},
			description: "The user ID of the player",
			description_localizations: {
				fr: "ID du joueur"
			},
			required:true
		}
	],
	default_member_permissions: "0"
} as const;
