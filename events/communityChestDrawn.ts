import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'communityChestCardDrawn';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['communityChestCardDrawn']): Promise<any> => {
    console.log(`Player ${data.playerId} drew a Community Chest card: ${data.card.description}`);
    // Additional logic for when a player draws a Community Chest card
};
