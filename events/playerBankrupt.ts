import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'playerBankrupt';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['playerBankrupt']): Promise<any> => {
    console.log(`Player ${data.playerId} has gone bankrupt.`);
    // Additional logic for when a player goes bankrupt
};
