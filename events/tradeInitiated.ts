import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'tradeInitiated';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['tradeInitiated']): Promise<any> => {
    console.log(`Player ${data.playerId} initiated a trade with ${data.tradePartnerId}.`);
    // Additional logic for when a player initiates a trade
};
