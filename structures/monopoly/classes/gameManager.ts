import { IGameManager } from "#type/IGameManager";
import { AIPlayer } from "./AIPlayer";
import { MonopolyGame } from "./monopoly";


/**
 * Manages Monopoly games for different channels.
 */
export class GameManager implements IGameManager {
    games: { [channelId: string]: MonopolyGame } = {};

    getGameForChannel(channelId: string): MonopolyGame | null {
        return this.games[channelId] || null;
    }

    addGameForChannel(channelId: string, game: MonopolyGame): void {
        this.games[channelId] = game;
    }

    async playTurn(channelId: string): Promise<void> {
        const game = this.getGameForChannel(channelId);
        if (!game) {
            console.error(`No game found for channel ${channelId}`);
            return;
        }

        const currentPlayer = game.turnManager.getCurrentPlayer();
        if (currentPlayer instanceof AIPlayer) {
            currentPlayer.makeMove(game);
        } else {
            // Handle human player's turn
        }
        // Proceed to the next turn
        game.turnManager.nextTurn();
    }
}

/**
 * Singleton instance of GameManager.
 */
export const gameManager = new GameManager();
