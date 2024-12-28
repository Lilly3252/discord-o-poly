import { convertToIPlayer, getPlayerData, savePlayerData } from "#database/model/database";
import { convertToProperty } from "#structures/monopoly/classes/boardSpace";
import { MonopolyGame } from "#structures/monopoly/classes/monopoly";
import { Achievement } from "#structures/monopoly/classes/rewards";
import { createPropertyOrRailroadCard } from "#structures/monopoly/imageGeneration";
import { SlashCommand } from "#type/slashCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('roll').setDescription('start a monopoly game');

export const run: SlashCommand['run'] = async (game: MonopolyGame, interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
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
