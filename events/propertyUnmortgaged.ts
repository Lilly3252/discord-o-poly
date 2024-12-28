import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'propertyUnmortgaged';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['propertyUnmortgaged']): Promise<any> => {
    console.log(`Player ${data.playerId} unmortgaged the property: ${data.property.name}`);
    // Additional logic for when a player unmortgages a property
};
