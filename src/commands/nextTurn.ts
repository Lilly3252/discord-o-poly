
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { nextTurnCommand } from "../slashinformation/nextTurn.js";
import { AIPlayer } from "../structures/classes/AIPlayer.js";

export default class extends Command<typeof nextTurnCommand> {
    public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof nextTurnCommand>,locale:string): Promise<void> {
        if (game) {
        game.nextTurn();
        const currentPlayer = game.turnManager.getCurrentPlayer();

        if (currentPlayer instanceof AIPlayer) {
            await interaction.reply(`It's now ${currentPlayer.name}'s turn! The AI player is making its move...`);
            await currentPlayer.makeMove(game);
            game.turnManager.nextTurn(); // Move to the next turn after AI player finishes its move
            const nextPlayer = game.turnManager.getCurrentPlayer();
            await interaction.followUp(`It's now ${nextPlayer.name}'s turn!`);
        } else {
            await interaction.reply(`It's now ${currentPlayer.name}'s turn!`);
        }
    } else {
        await interaction.reply('No game is currently running. Use /startgame to start a new game.');
    }
    }
}