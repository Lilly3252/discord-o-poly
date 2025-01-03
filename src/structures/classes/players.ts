import { User } from "discord.js";
import { IProperty, PlayerModel } from "src/database/player.js";
import { IPlayer } from "../types/monopoly/IPlayers.js";
import { BoardSpace } from "./boardSpace.js";
import { Card } from "./card.js";
import { Property } from "./property.js";


export class Player implements IPlayer{
    userId: string | null;
    name: string;
    position: number;
    money: number;
    properties: IProperty[];
    inJail: boolean;
    getOutOfJailFreeCards: number;
    isBankrupt: boolean;
    jailTurns: number;
    doublesRolled: number;
    achievements: {
        name: string;
        description: string;
        dateEarned: Date;
    }[];
    isAI: boolean;
    chanceCardsDrawn!: number;
    communityChestCardsDrawn!: number;

    /**
     * Creates an instance of Player.
     * @param user - The Discord user.
     * @param isAI - Whether the player is an AI player.
     */
    constructor(user: User | null, isAI: boolean = false) {
        this.userId = user!.id;
        this.name = user ? user.username : 'AI Player';
        this.position = 0;
        this.money = 1500;
        this.properties = [];
        this.inJail = false;
        this.getOutOfJailFreeCards = 0;
        this.isBankrupt = false;
        this.jailTurns = 0;
        this.doublesRolled = 0;
        this.achievements = [];
        this.isAI = isAI;
    }

     /**
     * Saves the player data to the database.
     */
     async save(): Promise<this> {
        const playerData = await PlayerModel.findOne({ name: this.name });
        if (playerData) {
            playerData.position = this.position;
            playerData.money = this.money;
            playerData.properties = this.properties;
            playerData.inJail = this.inJail;
            playerData.getOutOfJailFreeCards = this.getOutOfJailFreeCards;
            playerData.isBankrupt = this.isBankrupt;
            playerData.jailTurns = this.jailTurns;
            await playerData.save();
        } else {
            const newPlayer = new PlayerModel(this);
            await newPlayer.save();
        }
        return this
    }

    /**
     * Declares bankruptcy and transfers properties and money to other players.
     * @param toPlayers - The players to transfer properties and money to.
     */
    declareBankruptcy(toPlayers: Player[]) {
        if (toPlayers.length === 0) return;

        // Distribute money and properties among the players
        const moneyShare = Math.floor(this.money / toPlayers.length);
        const propertiesShare = Math.floor(this.properties.length / toPlayers.length);

        toPlayers.forEach(player => {
            player.money += moneyShare;
            player.properties.push(...this.properties.splice(0, propertiesShare));
        });

        // Reset current player's assets
        this.money = 0;
        this.properties = [];
        this.inJail = false;
        this.getOutOfJailFreeCards = 0;
    }

    /**
     * Gets the name of the current board space the player is on.
     * @param board - The board spaces.
     * @returns The name of the current board space.
     */
    getCurrentBoardSpaceName(board: BoardSpace[]): string {
        return board[this.position].name;
    }

    /**
     * Moves the player by a specified number of steps.
     * @param steps - The number of steps to move.
     * @param board - The board spaces.
     */
    move(steps: number, board: BoardSpace[]) {
        this.position = (this.position + steps) % board.length;
        this.save();
    }

    /**
     * Checks if a property is mortgaged.
     * @param propertyName - The name of the property.
     * @returns True if the property is mortgaged, false otherwise.
     */
    isPropertyMortgaged(propertyName: string): boolean {
        const property = this.properties.find(p => p.name === propertyName);
        return property ? property.mortgaged : false;
    }

/**
 * Adds a property to the player's properties.
 * @param property - The property object.
 */
addProperty(property: Property) {
    const newProperty: IProperty = {
        name: property.name,
        type: 'property', // Assuming a default type
        cost: property.cost ,
        mortgage: property.mortgage ,
        mortgaged: property.mortgaged,
        color: property.color ,
        rent: property.rent ,
        multpliedrent: property.multpliedrent ,
        group: property.group ,
        houseCost:property.houseCost ,
        houses: property.houses ,
        hotel: property.hotel ,
        corner: property.corner ,
        owner: property.owner ,
        position: property.position,
        isMortgaged: property.isMortgaged
    };

    this.properties.push(newProperty);
    this.save()
}

    /**
     * Updates the player's money by a specified amount.
     * @param amount - The amount to update the money by.
     */
    updateMoney(amount: number) {
        this.money += amount;
        this.save();
    }

    /**
     * Mortgages a property and updates the player's money.
     * @param property - The name of the property.
     * @param mortgageValue - The mortgage value of the property.
     * @returns True if the property was mortgaged, false otherwise.
     */
    mortgageProperty(property: string, mortgageValue: number): boolean {
        const prop = this.properties.find(p => p.name === property && !p.mortgaged);
        if (prop) {
            prop.mortgaged = true;
            this.updateMoney(mortgageValue);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Unmortgages a property and updates the player's money.
     * @param property - The name of the property.
     * @param mortgageValue - The mortgage value of the property.
     * @returns True if the property was unmortgaged, false otherwise.
     */
    unmortgageProperty(property: string, mortgageValue: number): boolean {
        const prop = this.properties.find(p => p.name === property && p.mortgaged);
        if (prop && this.money >= mortgageValue * 1.1) {
            prop.mortgaged = false;
            this.updateMoney(-mortgageValue * 1.1);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Pays rent to another player.
     * @param amount - The amount of rent to pay.
     * @param toPlayer - The player to pay rent to.
     * @returns True if the rent was paid, false otherwise.
     */
    payRent(amount: number, toPlayer: Player): boolean {
        if (this.money >= amount) {
            this.updateMoney(-amount);
            toPlayer.updateMoney(amount);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Buys a house on a property.
     * @param property - The property to buy a house on.
     * @returns True if the house was bought, false otherwise.
     */
    buyHouse(property: Property): boolean {
        if (this.money >= property.houseCost && property.houses! < 4 && !property.hotel) {
            this.updateMoney(-property.houseCost);
            property.houses! += 1;
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Buys a hotel on a property.
     * @param property - The property to buy a hotel on.
     * @returns True if the hotel was bought, false otherwise.
     */
    buyHotel(property: Property): boolean {
        if (this.money >= property.houseCost && property.houses === 4 && !property.hotel) {
            this.updateMoney(-property.houseCost);
            property.hotel = true;
            property.houses = 0;
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Sells a property.
     * @param propertyName - The name of the property to sell.
     * @returns True if the property was sold, false otherwise.
     */
    sellProperty(propertyName: string): boolean {
        const propertyIndex = this.properties.findIndex(p => p.name === propertyName);
        if (propertyIndex !== -1) {
            this.properties.splice(propertyIndex, 1);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Uses a "Get Out of Jail Free" card.
     * @returns True if the card was used, false otherwise.
     */
    useGetOutOfJailFreeCard(): boolean {
        if (this.getOutOfJailFreeCards > 0) {
            this.getOutOfJailFreeCards -= 1;
            this.inJail = false;
            this.save();
            return true;
        }
        return false;
    }
/**
 * Adds a drawn card to the player's record.
 * @param player - The player who drew the card.
 * @param card - The card that was drawn.
 */
async addDrawnCard(player: Player, card: Card) {
    if (card.type === "Chance") {
        player.chanceCardsDrawn += 1;
    } else {
        player.communityChestCardsDrawn += 1;
    }

    try {
        await player.save();
    } catch (error) {
        console.error("Error saving player data:", error);
    }
}
    /**
     * Ends the player's turn.
     */
    endTurn() {
        if (this.inJail) {
            this.jailTurns += 1;
        }
        this.save();
    }
}
