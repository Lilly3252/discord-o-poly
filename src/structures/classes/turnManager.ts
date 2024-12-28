import { ITurnManager } from "../types/monopoly/ITurnManager.js";
import { Player } from "./players.js";

/**
 * Manages the turns in the Monopoly game.
 */
export class TurnManager implements ITurnManager {
    players: Player[];
    currentPlayerIndex: number;
    turnCount: number;

    constructor(players: Player[]) {
        this.players = players;
        this.currentPlayerIndex = 0;
        this.turnCount = 0;
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.turnCount += 1;
    }

    resetTurns(): void {
        this.currentPlayerIndex = 0;
        this.turnCount = 0;
    }

    skipTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    getTurnCount(): number {
        return this.turnCount;
    }
}
