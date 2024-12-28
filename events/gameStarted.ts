import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'gameStarted';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['gameStarted']): Promise<any> => {
    console.log(`The game has started with players: ${data.playerIds.join(', ')}`);
    // Additional logic for when the game starts
};
