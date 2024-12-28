import { Player } from "../../classes/players.js";



/**
 * Manages the turns in the Monopoly game.
 */
export interface ITurnManager {
    /**
     * The players participating in the game.
     */
    players: Player[];

    /**
     * The index of the current player in the players array.
     */
    currentPlayerIndex: number;

    /**
     * The total number of turns that have been taken.
     */
    turnCount: number;

    /**
     * Retrieves the current player whose turn it is.
     * 
     * @returns The current player.
     */
    getCurrentPlayer(): Player;

    /**
     * Advances the game to the next turn.
     */
    nextTurn(): void;

    /**
     * Resets the turn count and current player index.
     */
    resetTurns(): void;

    /**
     * Skips the current player's turn.
     */
    skipTurn(): void;

    /**
     * Retrieves the total number of turns that have been taken.
     * 
     * @returns The total number of turns.
     */
    getTurnCount(): number;
}

