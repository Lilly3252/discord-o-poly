import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';

export const name: event['name'] = 'playerJoined';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['playerJoined']): Promise<any> => {
    console.log(`Player ${data.playerId} has joined the game.`);
    // Additional logic for when a player joins the game
};
