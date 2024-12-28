import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'gameEnded';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['gameEnded']): Promise<any> => {
    console.log(`The game has ended. Winner: ${data.winnerId}`);
    // Additional logic for when the game ends
};
