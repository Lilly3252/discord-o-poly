import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'rentPaid';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['rentPaid']): Promise<any> => {
    console.log(`Player ${data.playerId} paid rent to ${data.ownerId} for the property: ${data.property.name}`);
    // Additional logic for when a player pays rent
};
