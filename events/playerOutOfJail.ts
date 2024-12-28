import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'playerOutOfJail';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['playerOutOfJail']): Promise<any> => {
    console.log(`Player ${data.playerId} has gotten out of jail.`);
    // Additional logic for when a player gets out of jail
};
