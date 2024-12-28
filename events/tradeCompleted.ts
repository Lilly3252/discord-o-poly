import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'tradeCompleted';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['tradeCompleted']): Promise<any> => {
    console.log(`Player ${data.playerId} completed a trade with ${data.tradePartnerId}.`);
    // Additional logic for when a trade is completed
};
