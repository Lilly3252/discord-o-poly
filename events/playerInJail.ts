import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'playerInJail';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['playerInJail']): Promise<any> => {
    console.log(`Player ${data.playerId} has been sent to jail.`);
    // Additional logic for when a player is sent to jail
};
