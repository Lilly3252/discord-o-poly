import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'houseBuilt';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['houseBuilt']): Promise<any> => {
    console.log(`Player ${data.playerId} built a house on the property: ${data.property.name}`);
    // Additional logic for when a player builds a house
};
