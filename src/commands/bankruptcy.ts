
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { getPlayerData, savePlayerData } from "../database/database.js";
import { BankruptCommand } from "../slashinformation/bankruptcy.js";

export default class extends Command<typeof BankruptCommand> {
    public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof BankruptCommand>,locale:string): Promise<void> {
        //TODO: Game is instance of MonopolyGame  
        if (game) {
            const currentPlayer = game.turnManager.getCurrentPlayer();
            const toPlayersNames = interaction.options.getString('toPlayers')?.split(',').map(name => name.trim()) || [];
            const toPlayers = game.players.filter(player => toPlayersNames.includes(player.name));
    
            currentPlayer.declareBankruptcy(toPlayers);
    
            await interaction.reply(`${currentPlayer.name} has declared bankruptcy and shared assets with ${toPlayersNames.join(', ')}!`);
    
            // Update player data in the database
            const playerData = await getPlayerData(currentPlayer.name);
            if (playerData) {
                playerData.position = currentPlayer.position;
                playerData.money = currentPlayer.money;
                playerData.properties = currentPlayer.properties;
                playerData.inJail = currentPlayer.inJail;
                playerData.getOutOfJailFreeCards = currentPlayer.getOutOfJailFreeCards;
                await savePlayerData(playerData);
            }
    
            for (const toPlayer of toPlayers) {
                const toPlayerData = await getPlayerData(toPlayer.name);
                if (toPlayerData) {
                    toPlayerData.position = toPlayer.position;
                    toPlayerData.money = toPlayer.money;
                    toPlayerData.properties = toPlayer.properties;
                    toPlayerData.inJail = toPlayer.inJail;
                    toPlayerData.getOutOfJailFreeCards = toPlayer.getOutOfJailFreeCards;
                    await savePlayerData(toPlayerData);
                }
            }
        } else {
            await interaction.reply('No game is currently running. Use /startgame to start a new game.');
        }
    }
}

