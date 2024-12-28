// types/ITrade.ts

import { Player } from "../../classes/players.js";
import { Property } from "../../classes/property.js";




/**
 * Represents a trade between two players in the Monopoly game.
 */
export interface ITrade {
    /**
     * The player initiating the trade.
     */
    fromPlayer: Player;

    /**
     * The player receiving the trade offer.
     */
    toPlayer: Player;

    /**
     * The property involved in the trade.
     */
    property: Property;

    /**
     * The amount of money involved in the trade.
     */
    amount: number;

    /**
     * Whether the trade has been accepted.
     */
    isAccepted: boolean;

    /**
     * Validates the trade to ensure it meets all necessary conditions.
     * 
     * @returns A boolean indicating whether the trade is valid.
     */
    validateTrade(): boolean;

    /**
     * Executes the trade between the players.
     */
    executeTrade(): void;

    /**
     * Updates the properties of the players involved in the trade.
     */
    updatePlayerProperties(): void;

    /**
     * Updates the money of the players involved in the trade.
     */
    updatePlayerMoney(): void;

    /**
     * Accepts the trade offer.
     */
    acceptTrade(): void;

    /**
     * Rejects the trade offer.
     */
    rejectTrade(): void;

    /**
     * Cancels the trade offer.
     */
    cancelTrade(): void;
}
