import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'chanceCardDrawn';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['chanceCardDrawn']): Promise<any> => {
    console.log(`Player ${data.playerId} drew a Chance card: ${data.card.description}`);
    // Additional logic for when a player draws a Chance card
};
