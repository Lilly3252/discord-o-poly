import { Card } from "#structures/monopoly/classes/card";

/**
 * Represents a deck of cards in the Monopoly game.
 */
export interface IDeck {
    /**
     * The cards in the deck.
     */
    cards: Card[];

    /**
     * Draws a card from the deck.
     * 
     * @returns The drawn card, or undefined if the deck is empty.
     */
    drawCard(): Card | undefined;

    /**
     * Adds a card to the deck.
     * 
     * @param card - The card to add to the deck.
     */
    addCard(card: Card): void;
}
