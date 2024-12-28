import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const AddaiCommand = {
	name: "addai",
	description: "Add AI players to the game.",
	description_localizations: {
		fr: "Ajouter un joueur IA a la partie"
	},
	options: [
		{
			type: ApplicationCommandOptionType.Integer,
			name: "count",
			name_localizations: {
				fr: "nombre"
			},
			description: "Number of AI players to add",
			description_localizations: {
				fr: "Nombre de joueur a ajouter."
			},
			//add Min 1 and Max value 7 here
		},
		{
			type: ApplicationCommandOptionType.String,
			name:"names",
			description:"Comma-separated list of AI player names"
		},
	],
	default_member_permissions: "0"
} as const;
