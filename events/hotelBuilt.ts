import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'hotelBuilt';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['hotelBuilt']): Promise<any> => {
    console.log(`Player ${data.playerId} built a hotel on the property: ${data.property.name}`);
    // Additional logic for when a player builds a hotel
};
