
import fs from 'fs';
import path from 'path';
import { IProperty } from 'src/database/player.js';
import { IPlayer } from '../types/monopoly/IPlayers.js';
import { IAchievement, RewardType } from '../types/monopoly/rewards.js';

export class Achievement implements IAchievement {
    name: RewardType;
    description: string;
    dateEarned: Date;

    constructor(name: RewardType, description: string, dateEarned: Date) {
        this.name = name;
        this.description = description;
        this.dateEarned = dateEarned;
    }
    static achievements: IAchievement[] = [
        { name: RewardType.PropertyMogul, description: 'Own all properties of a single color group', dateEarned: new Date() },
        { name: RewardType.HotelTycoon, description: 'Build a hotel on a property', dateEarned: new Date() },
        { name: RewardType.RailroadBaron, description: 'Own all four railroads', dateEarned: new Date() },
        { name: RewardType.UtilityMaster, description: 'Own both utilities (Water Works and Electric Company)', dateEarned: new Date() },
        { name: RewardType.RentCollector, description: 'Collect rent from other players a certain number of times', dateEarned: new Date() },
        { name: RewardType.LuckyRoller, description: 'Roll doubles three times in a row', dateEarned: new Date() },
        { name: RewardType.CommunityHelper, description: 'Draw a certain number of Community Chest cards', dateEarned: new Date() },
        { name: RewardType.ChanceTaker, description: 'Draw a certain number of Chance cards', dateEarned: new Date() },
        { name: RewardType.JailBreaker, description: 'Get out of jail without using a "Get Out of Jail Free" card', dateEarned: new Date() },
        { name: RewardType.BigSpender, description: 'Spend a certain amount of in-game currency', dateEarned: new Date() },
        { name: RewardType.MonopolyMaster, description: 'Win a game of Monopoly', dateEarned: new Date() },
        { name: RewardType.BankruptcySurvivor, description: 'Avoid bankruptcy for a set number of turns', dateEarned: new Date() },
        { name: RewardType.TradeExpert, description: 'Successfully trade properties with other players a certain number of times', dateEarned: new Date() },
        { name: RewardType.FirstPurchase, description: 'Buy your first property', dateEarned: new Date() },
        { name: RewardType.FirstRent, description: 'Collect rent for the first time', dateEarned: new Date() },
        { name: RewardType.FirstHouse, description: 'Build your first house', dateEarned: new Date() },
        { name: RewardType.FirstHotel, description: 'Build your first hotel', dateEarned: new Date() },
        { name: RewardType.FirstTrade, description: 'Complete your first trade', dateEarned: new Date() },
        { name: RewardType.FirstJail, description: 'Go to jail for the first time', dateEarned: new Date() },
        { name: RewardType.FirstGetOutOfJail, description: 'Get out of jail for the first time', dateEarned: new Date() },
        { name: RewardType.FirstBankruptcy, description: 'Go bankrupt for the first time', dateEarned: new Date() },
        { name: RewardType.FirstWin, description: 'Win your first game', dateEarned: new Date() }
    ];

        propertyData = JSON.parse(fs.readFileSync(path.join(__dirname, 'board.json'), 'utf-8'));
        groupSizes = this.calculateGroupSizes(this.propertyData);

        /**
 * Checks and saves the achievement for the player.
 * @param playerId - The ID of the player.
 * @param achievementName - The name of the achievement.
 */
static async checkAndSaveAchievement(playerId: string, achievementName: string) {
    try {
        const player = await PlayerModel.findOne({ userId: playerId });
        if (!player) return;

        const achievement = Achievement.achievements.find(a => a.name === achievementName);
        if (!achievement) return;

        const alreadyEarned = player.achievements.some(a => a.name === achievementName);
        if (alreadyEarned) return;

        player.achievements.push({
            name: achievement.name,
            description: achievement.description,
            dateEarned: new Date()
        });
        await player.save();
        console.log(`Achievement "${achievementName}" earned by player ${player.name}`);
    } catch (error) {
        console.error('Error checking and saving achievement:', error);
    }
}
//  to calculate group sizesically
 calculateGroupSizes(properties: IProperty[]): { [key: string]: number } {
    const groupSizes: { [key: string]: number } = {};

    properties.forEach(property => {
        const groupKey = `${property.group![0]}-${property.group![2]}`;
        if (!groupSizes[groupKey]) {
            groupSizes[groupKey] = 0;
        }
        groupSizes[groupKey]++;
    });

    return groupSizes;
}

//  to get the total number of propertie group
 getTotalPropertiesInGroup(group: number[]): number {
    const groupKey = `${group[0]}-${group[2]}`;
    return this.groupSizes[groupKey]
}

//  to check if a player owns all propertie group
 ownsWholeGroup(properties: IProperty[], group: number[]): boolean {
    const groupKey = `${group[0]}-${group[2]}`;
    const totalPropertiesInGroup = group[2];
    const ownedPropertiesInGroup = properties.filter(property => {
        return property.group![0] === group[0] && property.group![2] === group[2];
    }).length;

    return ownedPropertiesInGroup === totalPropertiesInGroup
}

//  to find the group array for a given py name
 findGroupArray(propertyName: string, properties: IProperty[]): number[] | null {
    const property = properties.find(p => p.name === propertyName);
    return property ? property.group! : null;
}
/**
 * Checks if the player has earned the "Property Mogul" achievement.
 * @param player - The player to check.
 */
static async checkPropertyMogul(player: IPlayer): Promise<void> {
    const colorGroups = player.properties.reduce((groups, property) => {
        if (property.color) {
            groups[property.color] = (groups[property.color] || 0) + 1;
        }
        return groups;
    }, {} as Record<string, number>);

    for (const color in colorGroups) {
        if (colorGroups[color] === 3) { // Assuming 3 properties per color group
            await Achievement.checkAndSaveAchievement(player.userId!, 'Property Mogul');
            break;
        }
    }
}


/**
 * Checks if the player has earned the "Hotel Tycoon" achievement.
 * @param player - The player to check.
 */
 static async checkHotelTycoon(player: IPlayer): Promise<void> {
    const hasHotel = player.properties.some(property => property.hotel);
    if (hasHotel) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'Hotel Tycoon');
    }
}

/**
 * Checks if the player has earned the "Railroad Baron" achievement.
 * @param player - The player to check.
 */
 static async  checkRailroadBaron(player: IPlayer): Promise<void> {
    const railroads = player.properties.filter(property => property.type === 'railroad');
    if (railroads.length === 4) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'Railroad Baron');
    }
}

/**
 * Checks if the player has earned the "Utility Master" achievement.
 * @param player - The player to check.
 */
 static async checkUtilityMaster(player: IPlayer): Promise<void> {
    const utilities = player.properties.filter(property => property.type === 'utility');
    if (utilities.length === 2) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'Utility Master');
    }
}

/**
 * Checks if the player has earned the "Rent Collector" achievement.
 * @param player - The player to check.
 * @param rentCollected - The amount of rent collected by the player.
 */
 static async checkRentCollector(player: IPlayer, rentCollected: number): Promise<void> {
    if (rentCollected >= 10) { 
        await Achievement.checkAndSaveAchievement(player.userId!, 'Rent Collector');
    }
}

/**
 * Checks if the player has earned the "Lucky Roller" achievement.
 * @param player - The player to check.
 * @param doublesRolled - The number of doubles rolled by the player.
 */
 static async checkLuckyRoller(player: IPlayer, doublesRolled: number): Promise<void> {
    if (doublesRolled >= 3) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'Lucky Roller');
    }
}

/**
 * Checks if the player has earned the "Community Helper" achievement.
 * @param player - The player to check.
 * @param communityChestCardsDrawn - The number of Community Chest cards drawn by the player.
 */
 static  async checkCommunityHelper(player: IPlayer[], communityChestCardsDrawn: number): Promise<void> {
    if (communityChestCardsDrawn >= 5) { 
        await Achievement.checkAndSaveAchievement(player[0].userId!, 'Community Helper');
    }
}

/**
 * Checks if the player has earned the "Chance Taker" achievement.
 * @param player - The player to check.
 * @param chanceCardsDrawn - The number of Chance cards drawn by the player.
 */
 static async  checkChanceTaker(player: IPlayer[], chanceCardsDrawn: number): Promise<void> {
    if (chanceCardsDrawn >= 5) { 
        await Achievement.checkAndSaveAchievement(player[0].userId!, 'Chance Taker');
    }
}

/**
 * Checks if the player has earned the "Jail Breaker" achievement.
 * @param player - The player to check.
 * @param gotOutOfJailWithoutCard - Whether the player got out of jail without using a "Get Out of Jail Free" card.
 */
static async  checkJailBreaker(player: IPlayer, gotOutOfJailWithoutCard: boolean): Promise<void> {
    if (gotOutOfJailWithoutCard) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'Jail Breaker');
    }
}

/**
 * Checks if the player has earned the "Big Spender" achievement.
 * @param player - The player to check.
 * @param amountSpent - The amount of in-game currency spent by the player.
 */
static  async  checkBigSpender(player: IPlayer, amountSpent: number): Promise<void> {
    if (amountSpent >= 1000) { 
        await Achievement.checkAndSaveAchievement(player.userId!, 'Big Spender');
    }
}

/**
 * Checks if the player has earned the "Monopoly Master" achievement.
 * @param player - The player to check.
 * @param gameWon - Whether the player won the game.
 */
static  async  checkMonopolyMaster(player: IPlayer, gameWon: boolean): Promise<void> {
    if (gameWon) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'Monopoly Master');
    }
}

/**
 * Checks if the player has earned the "Bankruptcy Survivor" achievement.
 * @param player - The player to check.
 * @param turnsSurvived - The number of turns the player survived without going bankrupt.
 */
static async  checkBankruptcySurvivor(player: IPlayer, turnsSurvived: number): Promise<void> {
    if (turnsSurvived >= 20) { 
        await Achievement.checkAndSaveAchievement(player.userId!, 'Bankruptcy Survivor');
    }
}

/**
 * Checks if the player has earned the "Trade Expert" achievement.
 * @param player - The player to check.
 * @param tradesCompleted - The number of trades completed by the player.
 */
static  async  checkTradeExpert(player: IPlayer, tradesCompleted: number): Promise<void> {
    if (tradesCompleted >= 5) { 
        await Achievement.checkAndSaveAchievement(player.userId!, 'Trade Expert');
    }
}

/**
 * Checks if the player has earned the "First Purchase" achievement.
 * @param player - The player to check.
 */
 static async  checkFirstPurchase(player: IPlayer): Promise<void> {
    if (player.properties.length === 1) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Purchase');
    }
}

/**
 * Checks if the player has earned the "First Rent" achievement.
 * @param player - The player to check.
 * @param rentCollected - The amount of rent collected by the player.
 */
 static async  checkFirstRent(player: IPlayer, rentCollected: number): Promise<void> {
    if (rentCollected === 1) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Rent');
    }
}

/**
 * Checks if the player has earned the "First House" achievement.
 * @param player - The player to check.
 */
 static async  checkFirstHouse(player: IPlayer): Promise<void> {
    const hasHouse = convertToPlayer(player).properties.some(property => property.houses === 1);
    if (hasHouse) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First House');
    }
}

/**
 * Checks if the player has earned the "First Hotel" achievement.
 * @param player - The player to check.
 */
 static async  checkFirstHotel(player: IPlayer): Promise<void> {
    const hasHotel = player.properties.some(property => property.hotel);
    if (hasHotel) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Hotel');
    }
}

/**
 * Checks if the player has earned the "First Trade" achievement.
 * @param player - The player to check.
 * @param tradesCompleted - The number of trades completed by the player.
 */
 static async  checkFirstTrade(player: IPlayer, tradesCompleted: number): Promise<void> {
    if (tradesCompleted === 1) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Trade');
    }
}

/**
 * Checks if the player has earned the "First Jail" achievement.
 * @param player - The player to check.
 */
 static async  checkFirstJail(player: IPlayer): Promise<void> {
    if (player.inJail && player.jailTurns === 1) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Jail');
    }
}

/**
 * Checks if the player has earned the "First Get Out of Jail" achievement.
 * @param player - The player to check.
 */
 static async checkFirstGetOutOfJail(player: IPlayer): Promise<void> {
    if (!player.inJail && player.jailTurns > 0) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Get Out of Jail');
    }
}

/**
 * Checks if the player has earned the "First Bankruptcy" achievement.
 * @param player - The player to check.
 */
 static async checkFirstBankruptcy(player: IPlayer): Promise<void> {
    if (player.isBankrupt) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Bankruptcy');
    }
}

/**
 * Checks if the player has earned the "First Win" achievement.
 * @param player - The player to check.
 * @param gameWon - Whether the player won the game.
 */
 static async checkFirstWin(player: IPlayer, gameWon: boolean): Promise<void> {
    if (gameWon) {
        await Achievement.checkAndSaveAchievement(player.userId!, 'First Win');
    }
}

/**
 * Checks all achievements for the player.
 * @param player - The player to check.
 */
static async  checkAllAchievements(player: IPlayer): Promise<void> {
    await this.checkPropertyMogul(player);
    await this.checkHotelTycoon(player);
    await this.checkRailroadBaron(player);
    await this.checkUtilityMaster(player);
    await this.checkRentCollector(player, 10); 
    await this.checkLuckyRoller(player, 3); 
    await this.checkCommunityHelper(player[0], 5); 
    await this.checkChanceTaker(player[0], 5); 
    await this.checkJailBreaker(player, true); 
    await this.checkBigSpender(player, 1000); 
    await this.checkMonopolyMaster(player, true); 
    await this.checkBankruptcySurvivor(player, 20); 
    await this.checkTradeExpert(player, 5); 
    await this.checkFirstPurchase(player);
    await this.checkFirstRent(player, 1); 
    await this.checkFirstHouse(player);
    await this.checkFirstHotel(player);
    await this.checkFirstTrade(player, 1); 
    await this.checkFirstJail(player);
    await this.checkFirstGetOutOfJail(player);
    await this.checkFirstBankruptcy(player);
    await this.checkFirstWin(player, true); 
}
}
