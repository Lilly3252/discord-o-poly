// types/IGameManager.ts
import { MonopolyGame } from '#structures/monopoly/classes/monopoly';

/**
 * Manages Monopoly games for different channels.
 */
export interface IGameManager {
    /**
     * A collection of Monopoly games, indexed by channel ID.
     */
    games: { [channelId: string]: MonopolyGame };

    /**
     * Retrieves the game associated with a specific channel.
     * 
     * @param channelId - The ID of the channel.
     * @returns The Monopoly game for the channel, or null if no game exists.
     */
    getGameForChannel(channelId: string): MonopolyGame | null;

    /**
     * Adds a Monopoly game for a specific channel.
     * 
     * @param channelId - The ID of the channel.
     * @param game - The Monopoly game to add.
     */
    addGameForChannel(channelId: string, game: MonopolyGame): void;

    /**
     * Plays a turn in the game associated with a specific channel.
     * 
     * @param channelId - The ID of the channel.
     * @returns A promise that resolves when the turn is complete.
     */
    playTurn(channelId: string): Promise<void>;
}

