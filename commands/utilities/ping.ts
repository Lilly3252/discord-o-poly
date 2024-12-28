//import emoji from "../../structures/JSONs/emoji.json" assert {type : "json"};

import { MonopolyGame } from '#structures/monopoly/classes/monopoly';
import type { SlashCommand } from '#type/slashCommands';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('ping').setDescription('pong.');

export const run: SlashCommand['run'] = async (game: MonopolyGame,interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	await interaction.reply("No")
};
