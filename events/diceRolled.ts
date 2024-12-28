import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'diceRolled';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['diceRolled']): Promise<any> => {
    console.log(`Player ${data.playerId} rolled the dice: ${data.diceResult}`);
    // Additional logic for when a player rolls the dice
};
