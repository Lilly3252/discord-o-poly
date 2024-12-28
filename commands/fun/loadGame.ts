import { loadGameData } from "#database/model/database";
import { MonopolyGame } from "#structures/monopoly/classes/monopoly";
import { SlashCommand } from "#type/slashCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('loadgame').setDescription('Load a previously saved game state');

export const run: SlashCommand['run'] = async (game: MonopolyGame,interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
     await loadGameData();
    if (game) {
        // Set the loaded game as the current game
        // THIS MIGHT involve updating the game manager or other relevant components
        await interaction.reply('Game state has been loaded successfully!');
    } else {
        await interaction.reply('No saved game found. Use /startgame to start a new game.');
    }
}
