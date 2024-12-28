import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { loadGameData } from "../database/database.js";
import { LoadGameCommand } from "../slashinformation/loadGame.js";

export default class extends Command<typeof LoadGameCommand> {
    public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof LoadGameCommand>,locale:string): Promise<void> {
        await loadGameData();
    if (game) {
        // Set the loaded game as the current game
        // THIS MIGHT involve updating the game manager or other relevant components
        await interaction.reply('Game state has been loaded successfully!');
    } else {
        await interaction.reply('No saved game found. Use /startgame to start a new game.');
    }
    }
}
