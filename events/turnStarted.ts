import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'turnStarted';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['turnStarted']): Promise<any> => {
    console.log(`Player ${data.playerId}'s turn has started.`);
    // Additional logic for when a player's turn starts
};
