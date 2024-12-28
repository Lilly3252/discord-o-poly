import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { PlayerModel } from "../database/player.js";
import { ShowInfoCommand } from "../slashinformation/showInfo.js";

export default class extends Command<typeof ShowInfoCommand> {
    public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof ShowInfoCommand>,locale:string): Promise<void> {
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
    }
}











