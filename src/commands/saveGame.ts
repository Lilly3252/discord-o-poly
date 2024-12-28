
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { saveGameData } from "../database/database.js";
import { SaveGameCommand } from "../slashinformation/saveGame.js";

export default class extends Command<typeof SaveGameCommand> {
    public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof SaveGameCommand>,locale:string): Promise<void> {
        if (game) {
        await saveGameData(game);
        await interaction.reply('Game state has been saved successfully!');
    } else {
        await interaction.reply('No game is currently running. Use /startgame to start a new game.');
    }
    }
}













