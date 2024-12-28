import process from "node:process";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import * as command from "./slashinformation/index.js";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
try {
	console.log("Start refreshing interaction (/) commands.");

	await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
		body: [
	 command.AddaiCommand,
	 command.BankruptCommand,
	 command.LoadGameCommand,
	 command.RollCommand,
	 command.SaveGameCommand,
	 command.ShowInfoCommand,
	 command.StartGameCommand,
	 command.nextTurnCommand,
		]
	});

	console.log("Successfully reloaded interaction (/) commands.");
} catch (error) {
	console.error(error);
}
