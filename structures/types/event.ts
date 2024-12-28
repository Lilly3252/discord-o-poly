import client from '#structures/lillyClient.js';
import { Card } from '#structures/monopoly/classes/card.js';
import { Property } from '#structures/monopoly/classes/property.js';
import { RewardType } from './rewards.js';


/**
 * Represents an event in the system.
 */
export interface event {
    /**
     * The name of the event.
     */
    name: string;

    /**
     * The client associated with the event.
     */
    client: client;

    /**
     * The type of the event.
     */
    type: string;

    /**
     * The emitter of the event.
     */
    emitter: string;

    /**
     * Whether the event should be executed only once.
     */
    once: boolean;

    /**
     * Executes the event.
     * 
     * @param args - Arguments for the event.
     * @returns A promise that resolves when the event execution is complete.
     */
    run(...args: unknown[]): Promise<any>;
}

/**
 * Represents the payloads for various Monopoly events.
 */
export interface MonopolyEventPayloads {
    gameStarted: { gameId: string, playerIds: string[] };
    gameEnded: { gameId: string, winnerId: string };
    playerJoin: { gameId: string, playerId: string };
    playerLeave: { gameId: string, playerId: string };
    turnStart: { gameId: string, playerId: string };
    turnEnd: { gameId: string, playerId: string };
    propertyPurchased: { gameId: string, playerId: string, property: Property };
    rentPaid: { gameId: string, ownerId: string, playerId: string, amount: number, property: Property };
    playerJailed: { gameId: string, playerId: string };
    playerReleasedFromJail: { gameId: string, playerId: string };
    bankruptcyDeclared: { gameId: string, playerId: string };
    gameWon: { gameId: string, playerId: string };
    communityChestDrawn: { gameId: string, playerId: string, card: Card };
    doubleRolled: { gameId: string, playerId: string };
    rewardWon: { gameId: string, playerId: string, rewardType: RewardType };
    playerJoined: { gameId: string, playerId: string };
    playerLeft: { gameId: string, playerId: string };
    turnStarted: { gameId: string, playerId: string };
    turnEnded: { gameId: string, playerId: string };
    diceRolled: { gameId: string, playerId: string, diceResult: number[] };
    propertyBought: { gameId: string, playerId: string, property: Property };
    propertyMortgaged: { gameId: string, playerId: string, property: Property };
    propertyUnmortgaged: { gameId: string, playerId: string, property: Property };
    houseBuilt: { gameId: string, playerId: string, property: Property };
    hotelBuilt: { gameId: string, playerId: string, property: Property };
    playerBankrupt: { gameId: string, playerId: string };
    playerInJail: { gameId: string, playerId: string };
    playerOutOfJail: { gameId: string, playerId: string };
    tradeInitiated: { gameId: string, playerId: string, tradePartnerId: string };
    tradeCompleted: { gameId: string, playerId: string, tradePartnerId: string };
    chanceCardDrawn: { gameId: string, playerId: string, card: Card };
    communityChestCardDrawn: { gameId: string, playerId: string, card: Card };
}

/**
 * Represents the types of events that can occur in the game.
 */
export type EventTypes = 
    'gameStarted' |
    'gameEnded' |
    'playerJoin' |
    'playerLeave' |
    'turnStart' |
    'turnEnd' |
    'propertyPurchased' |
    'rentPaid' |
    'playerJailed' |
    'playerReleasedFromJail' |
    'bankruptcyDeclared' |
    'gameWon' |
    'communityChestDrawn' |
    'doubleRolled' |
    'rewardWon' |
    'playerJoined' |
    'playerLeft' |
    'turnStarted' |
    'turnEnded' |
    'diceRolled' |
    'propertyBought' |
    'propertyMortgaged' |
    'propertyUnmortgaged' |
    'houseBuilt' |
    'hotelBuilt' |
    'playerBankrupt' |
    'playerInJail' |
    'playerOutOfJail' |
    'tradeInitiated' |
    'tradeCompleted' |
    'chanceCardDrawn' |
    'communityChestCardDrawn';
