import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'playerLeft';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['playerLeft']): Promise<any> => {
    console.log(`Player ${data.playerId} has left the game.`);
    // Additional logic for when a player leaves the game
};
