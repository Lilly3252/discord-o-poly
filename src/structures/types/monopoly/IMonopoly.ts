import { BoardSpace } from "#structures/monopoly/classes/boardSpace";
import { Card } from "#structures/monopoly/classes/card";
import { Deck } from "#structures/monopoly/classes/deck";
import { Player } from "#structures/monopoly/classes/players";
import { TurnManager } from "#structures/monopoly/classes/turnManager";
import { CommandInteraction } from "discord.js";

/**
 * Represents a Monopoly game.
 */
export interface IMonopolyGame {
    /**
     * The players participating in the game.
     */
    players: Player[];

    /**
     * The board spaces in the game.
     */
    board: BoardSpace[];

    /**
     * The manager responsible for handling turns.
     */
    turnManager: TurnManager;

    /**
     * The deck of Chance cards.
     */
    chanceDeck: Deck;

    /**
     * The deck of Community Chest cards.
     */
    communityChestDeck: Deck;

    /**
     * The money accumulated in the Free Parking space.
     */
    freeParkingMoney: number;

    /**
     * Saves the data of a player.
     * 
     * @param player - The player whose data is to be saved.
     * @returns A promise that resolves when the data is saved.
     */
    savePlayerData(player: Player): Promise<void>;

    /**
     * Adds a player to the game.
     * 
     * @param player - The player to add.
     */
    addPlayer(player: Player): void;

    /**
     * Advances the game to the next turn.
     */
    nextTurn(): void;

    /**
     * Rolls the dice.
     * 
     * @returns The result of the dice roll.
     */
    rollDice(): number;

    /**
     * Handles the actions for a player landing on a space.
     * 
     * @param player - The player landing on the space.
     */
    handleSpace(player: Player): void;

    /**
     * Handles the actions for a player landing on a property.
     * 
     * @param player - The player landing on the property.
     * @param space - The property space.
     */
    handleProperty(player: Player, space: BoardSpace): void;

    /**
     * Handles the actions for a player drawing a Chance card.
     * 
     * @param player - The player drawing the card.
     * @param interaction - The interaction associated with the card draw.
     */
    handleChance(player: Player, interaction: CommandInteraction): void;

    /**
     * Handles the actions for a player drawing a Community Chest card.
     * 
     * @param player - The player drawing the card.
     * @param interaction - The interaction associated with the card draw.
     */
    handleCommunityChest(player: Player, interaction: CommandInteraction): void;

    /**
     * Handles the actions for a player landing on a tax space.
     * 
     * @param player - The player landing on the tax space.
     * @param space - The tax space.
     */
    handleTax(player: Player, space: BoardSpace): void;

    /**
     * Sends a player to jail.
     * 
     * @param player - The player to send to jail.
     */
    sendToJail(player: Player): void;

    /**
     * Handles the actions for a player landing on Free Parking.
     * 
     * @param player - The player landing on Free Parking.
     */
    handleFreeParking(player: Player): void;

    /**
     * Handles the actions for a player passing or landing on Go.
     * 
     * @param player - The player passing or landing on Go.
     */
    handleGo(player: Player): void;

    /**
     * Handles the actions for a player landing on Go to Jail.
     * 
     * @param player - The player landing on Go to Jail.
     */
    handleGoToJail(player: Player): void;

    /**
     * Draws a Chance card from the deck.
     * 
     * @returns The drawn Chance card.
     */
    drawChanceCard(): Card;

    /**
     * Draws a Community Chest card from the deck.
     * 
     * @returns The drawn Community Chest card.
     */
    drawCommunityChestCard(): Card;
}
