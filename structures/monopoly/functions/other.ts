import { PlayerModel } from "#database/model/player";


export async function getPlayerInfo(userId: string) {
    try {
        const player = await PlayerModel.findOne({ userId }).exec();
        if (!player) {
            console.log('Player not found');
            return;
        }

        console.log(`Player Info:
        User ID: ${player.userId}
        Name: ${player.name}
        Position: ${player.position}
        Money: ${player.money}
        Properties: ${player.properties.map(prop => prop.name).join(', ')}
        In Jail: ${player.inJail}
        Get Out of Jail Free Cards: ${player.getOutOfJailFreeCards}
        Is Bankrupt: ${player.isBankrupt}
        Jail Turns: ${player.jailTurns}
        Achievements: ${player.achievements.map(ach => ach.name).join(', ')}`);
    } catch (error) {
        console.error('Error retrieving player info:', error);
    }
}

