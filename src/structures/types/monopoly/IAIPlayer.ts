import { MonopolyGame } from "../../classes/monopoly.js";
import { Player } from "../../classes/players.js";

/**
 * Represents an AI player in the Monopoly game.
 */
export interface IAIPlayer {
    /**
     * The name of the AI player.
     */
    name: string;

    /**
     * Makes a move in the game.
     * 
     * @param game - The current game instance.
     * @returns A promise that resolves when the move is complete.
     */
    makeMove(game: MonopolyGame): Promise<void>;

    /**
     * Buys a property.
     * 
     * @param space - The space representing the property to be bought.
     * @returns A promise that resolves when the property is bought.
     */
    buyProperty(space: any): Promise<void>;

    /**
     * Manages the properties owned by the AI player.
     * 
     * @param game - The current game instance.
     * @returns A promise that resolves when the properties are managed.
     */
    manageProperties(game: MonopolyGame): Promise<void>;

    /**
     * Proposes a trade to another player.
     * 
     * @param game - The current game instance.
     * @returns A promise that resolves when the trade is proposed.
     */
    proposeTrade(game: MonopolyGame): Promise<void>;

    /**
     * Executes a trade with another player.
     * 
     * @param player - The player to trade with.
     * @param property - The property involved in the trade.
     * @returns A promise that resolves to a boolean indicating whether the trade was successful.
     */
    executeTrade(player: Player, property: any): Promise<boolean>;

    /**
     * Handles the situation when the AI player is in jail.
     */
    handleJailSituation(): void;
}
