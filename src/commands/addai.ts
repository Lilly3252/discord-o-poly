
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import "reflect-metadata";
import { AddaiCommand } from "../slashinformation/addai.js";
import { AIPlayer } from "../structures/classes/AIPlayer.js";

export default class extends Command<typeof AddaiCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof AddaiCommand>,locale:string): Promise<void> {
        if (!game) {
        await interaction.reply('No game found in this channel.');
        return;
    }

    const count = args.count
    const names = args.names
    const nameList = names ? names.split(',').map(name => name.trim()) : [];

    // Add the specified number of AI players to the game
    for (let aiIndex = 0; aiIndex < count!; aiIndex++) {
        const aiName = nameList[aiIndex] || `AI Bot ${aiIndex + 1}`;
        const aiPlayer = new AIPlayer(aiName);
        game.addPlayer(aiPlayer);
    }

    await interaction.reply(`${count} AI player(s) added to the game!`);
	}
}