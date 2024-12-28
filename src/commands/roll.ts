import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { convertToIPlayer, getPlayerData, savePlayerData } from "../database/database.js";
import { RollCommand } from "../slashinformation/roll.js";
import { convertToProperty } from "../structures/classes/boardSpace.js";
import { Achievement } from "../structures/classes/rewards.js";
import { createPropertyOrRailroadCard } from "../structures/functions/imageGeneration.js";

export default class extends Command<typeof RollCommand> {
    public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof RollCommand>,locale:string): Promise<void> {
      if (game) {
        const currentPlayer = game.turnManager.getCurrentPlayer();
        const diceRoll = game.rollDice();
        currentPlayer.move(diceRoll, game.board);
        const currentBoardSpaceName = currentPlayer.getCurrentBoardSpaceName(game.board);
        await interaction.reply(`${currentPlayer.name} rolled a ${diceRoll} and moved to ${currentBoardSpaceName} (position ${currentPlayer.position})!`);
        const currentBoardSpace = game.board[currentPlayer.position];
        const properties = currentPlayer.properties.map(prop => convertToProperty(prop));
        await createPropertyOrRailroadCard(currentBoardSpace, interaction, properties);
        const playersData = convertToIPlayer(currentPlayer)

        await Achievement.checkAllAchievements(playersData)

        if (currentBoardSpaceName === 'Chance' || currentBoardSpaceName === 'Lootbox') {
            game.handleSpace(currentPlayer);
        }

  
        const playerData = await getPlayerData(currentPlayer.name);
        if (playerData) {
            playerData.position = currentPlayer.position;
            playerData.money = currentPlayer.money;
            playerData.properties = currentPlayer.properties;
            playerData.inJail = currentPlayer.inJail;
            playerData.getOutOfJailFreeCards = currentPlayer.getOutOfJailFreeCards;
            await savePlayerData(playerData);
        }
    } else {
        await interaction.reply('No game is currently running. Use /startgame to start a new game.');
    }
    }
}





