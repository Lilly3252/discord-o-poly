import { Player } from "#structures/monopoly/classes/players";

/**
 * Represents the bank in the Monopoly game.
 */
export interface IBank {
    /**
     * The total amount of money the bank has.
     */
    money: number;

    /**
     * The number of houses available in the bank.
     */
    houses: number;

    /**
     * The number of hotels available in the bank.
     */
    hotels: number;

    /**
     * Distributes money to a player.
     * 
     * @param player - The player receiving the money.
     * @param amount - The amount of money to distribute.
     */
    distributeMoney(player: Player, amount: number): void;

    /**
     * Receives money from a player.
     * 
     * @param player - The player giving the money.
     * @param amount - The amount of money to receive.
     */
    receiveMoney(player: Player, amount: number): void;

    /**
     * Sells a house to a player for a specific property.
     * 
     * @param player - The player buying the house.
     * @param property - The property for which the house is being bought.
     */
    buyHouse(player: Player, property: string): void;

    /**
     * Sells a hotel to a player for a specific property.
     * 
     * @param player - The player buying the hotel.
     * @param property - The property for which the hotel is being bought.
     */
    buyHotel(player: Player, property: string): void;
}
