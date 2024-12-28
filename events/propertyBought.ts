import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'propertyBought';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['propertyBought']): Promise<any> => {
    console.log(`Player ${data.playerId} bought the property: ${data.property.name}`);
    // Additional logic for when a player buys a property
};
