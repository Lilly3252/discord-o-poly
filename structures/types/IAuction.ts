import { Player } from "#structures/monopoly/classes/players";
import { Property } from "#structures/monopoly/classes/property";

/**
 * Represents an auction in the Monopoly game.
 */
export interface IAuction {
    /**
     * The property being auctioned.
     */
    property: Property;

    /**
     * The players participating in the auction.
     */
    players: Player[];

    /**
     * The highest bid placed in the auction.
     */
    highestBid: number;

    /**
     * The player who placed the highest bid, or null if there is no highest bidder yet.
     */
    highestBidder: Player | null;

    /**
     * Initializes the auction with the given property and players.
     * 
     * @param property - The property to be auctioned.
     * @param players - The players participating in the auction.
     */
    initializeAuction(property: Property, players: Player[]): void;

    /**
     * Places a bid in the auction.
     * 
     * @param player - The player placing the bid.
     * @param amount - The amount of the bid.
     */
    placeBid(player: Player, amount: number): void;

    /**
     * Finalizes the auction and determines the winner.
     */
    finalizeAuction(): void;

    /**
     * Updates the money of the players based on the auction results.
     */
    updatePlayerMoney(): void;
}
