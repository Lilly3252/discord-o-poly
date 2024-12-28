import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'propertyMortgaged';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['propertyMortgaged']): Promise<any> => {
    console.log(`Player ${data.playerId} mortgaged the property: ${data.property.name}`);
    // Additional logic for when a player mortgages a property
};
