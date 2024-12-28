
import { IDeck } from "../types/monopoly/IDeck";
import { Card } from "./card";
/**
 * Represents a deck of cards in the Monopoly game.
 */
export class Deck implements IDeck {
    cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    drawCard(): Card | undefined {
        return this.cards.shift();
    }

    addCard(card: Card): void {
        this.cards.push(card);
        return
    }
}
