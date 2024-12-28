import { MonopolyGame } from "../../classes/monopoly.js";
import { Player } from "../../classes/players.js";


export type CardType = "Chance" | "Community"
export type CardActionType = 'advance' | 'pay' | 'collect' | 'move' | 'jail' | 'back' | 'repairs' | 'spend' | 'spend-each-player' | 'fine' | 'tax' | 'jail-card' | 'earn-each-player' | 'improvement';

/**
 * Represents a card in the Monopoly game.
 */
export interface ICard {
    /**
     * The type of the card.
     */
    type: CardType;

    /**
     * The action type of the card.
     */
    actionType: CardActionType;

    /**
     * A brief description of the card.
     */
    description: string;

    /**
     * The amount associated with the card. It can be a number, a string, or an array of numbers.
     */
    amount: number | string | number[];

    /**
     * Executes the action associated with the card.
     * 
     * @param game - The current game instance.
     * @param player - The player who is executing the action.
     * @returns A promise that resolves when the action is complete.
     */
    executeAction(game: MonopolyGame, player: Player): Promise<void>;
}
