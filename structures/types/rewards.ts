/**
 * Represents the different types of rewards in the Monopoly game.
 */
export enum RewardType {
    PropertyMogul = 'Property Mogul',
    HotelTycoon = 'Hotel Tycoon',
    RailroadBaron = 'Railroad Baron',
    UtilityMaster = 'Utility Master',
    RentCollector = 'Rent Collector',
    LuckyRoller = 'Lucky Roller',
    CommunityHelper = 'Community Helper',
    ChanceTaker = 'Chance Taker',
    JailBreaker = 'Jail Breaker',
    BigSpender = 'Big Spender',
    MonopolyMaster = 'Monopoly Master',
    BankruptcySurvivor = 'Bankruptcy Survivor',
    TradeExpert = 'Trade Expert',
    FirstPurchase = 'First Purchase',
    FirstRent = 'First Rent',
    FirstHouse = 'First House',
    FirstHotel = 'First Hotel',
    FirstTrade = 'First Trade',
    FirstJail = 'First Jail',
    FirstGetOutOfJail = 'First Get Out of Jail',
    FirstBankruptcy = 'First Bankruptcy',
    FirstWin = 'First Win'
}

/**
 * Represents an achievement earned by a player.
 */
export interface IAchievement {
    /**
     * The name of the achievement, represented by a reward type.
     */
    name: RewardType;

    /**
     * A brief description of the achievement.
     */
    description: string;

    /**
     * The date the achievement was earned.
     */
    dateEarned: Date;
}
