import { PlayerModel } from "#database/model/player";
import { MonopolyGame } from "#structures/monopoly/classes/monopoly";
import { createStandardEmbed } from "#structures/monopoly/functions/standarizedEmbed";
import { SlashCommand } from "#type/slashCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
    .setName('showinfo')
    .setDescription('Displays player information.')
    .addStringOption(option => 
        option.setName('userid')
            .setDescription('The user ID of the player')
            .setRequired(true)
    );

export const run: SlashCommand['run'] = async (game: MonopolyGame,interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
    const userId = interaction.options.getString('userid', true);

    try {
        const player = await PlayerModel.findOne({ userId }).exec();
        if (!player) {
            await interaction.reply({
                content: 'Player not found',
                ephemeral: true,
            });
            return;
        }

        const fields = [
            { name: 'User ID', value: player.userId, inline: true },
            { name: 'Name', value: player.name, inline: true },
            { name: 'Position', value: player.position.toString(), inline: true },
            { name: 'Money', value: player.money.toString(), inline: true },
            { name: 'Properties', value: player.properties.map(prop => prop.name).join(', '), inline: false },
            { name: 'In Jail', value: player.inJail.toString(), inline: true },
            { name: 'Get Out of Jail Free Cards', value: player.getOutOfJailFreeCards.toString(), inline: true },
            { name: 'Is Bankrupt', value: player.isBankrupt.toString(), inline: true },
            { name: 'Jail Turns', value: player.jailTurns.toString(), inline: true },
            { name: 'Achievements', value: player.achievements.map(ach => ach.name).join(', '), inline: false }
        ];

        const embed = createStandardEmbed(
            'Player Information',
            `Details for player with User ID: ${player.userId}`,
            '#0099ff',
            fields,
            'Powered by Monopoly Game'
        );

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    } catch (error) {
        console.error('Error retrieving player info:', error);
        await interaction.reply({
            content: 'An error occurred while retrieving player info.',
            ephemeral: true,
        });
    }
};