import { IProperty } from "./IProperty";

/**
 * Represents a player in the Monopoly game.
 */
export interface IPlayer {
    /**
     * The user ID of the player, or null if not applicable.
     */
    userId: string | null;

    /**
     * The name of the player.
     */
    name: string;

    /**
     * The current position of the player on the board.
     */
    position: number;

    /**
     * The amount of money the player has.
     */
    money: number;

    /**
     * The properties owned by the player.
     */
    properties: IProperty[];

    /**
     * Whether the player is currently in jail.
     */
    inJail: boolean;

    /**
     * The number of Get Out of Jail Free cards the player has.
     */
    getOutOfJailFreeCards: number;

    /**
     * Whether the player is bankrupt.
     */
    isBankrupt: boolean;

    /**
     * The number of turns the player has been in jail.
     */
    jailTurns: number;

    /**
     * The achievements earned by the player.
     */
    achievements: {
        /**
         * The name of the achievement.
         */
        name: string;

        /**
         * A brief description of the achievement.
         */
        description: string;

        /**
         * The date the achievement was earned.
         */
        dateEarned: Date;
    }[];

    /**
     * Whether the player is controlled by AI.
     */
    isAI: boolean;

    /**
     * The number of Chance cards drawn by the player.
     */
    chanceCardsDrawn: number;

    /**
     * The number of Community Chest cards drawn by the player.
     */
    communityChestCardsDrawn: number;

    /**
     * Saves the player's data.
     * 
     * @returns A promise that resolves to the player instance.
     */
    save(): Promise<this>;
}
