import { Player } from "../../classes/players.js";


/**
 * Represents a property in the Monopoly game.
 */
export interface IProperty {
    /**
     * The name of the property.
     */
    name: string;

    /**
     * The type of the property (e.g., street, utility, etc.).
     */
    type: string;

    /**
     * The cost to purchase the property (optional).
     */
    cost?: number;

    /**
     * The mortgage value of the property (optional).
     */
    mortgage?: number;

    /**
     * Whether the property is currently mortgaged.
     */
    mortgaged: boolean;

    /**
     * The color group of the property (optional).
     */
    color?: string;

    /**
     * The base rent of the property (optional).
     */
    rent?: number;

    /**
     * The rent values when houses are built on the property (optional).
     */
    multpliedrent?: number[];

    /**
     * The group of properties that this property belongs to (optional).
     */
    group?: number[];

    /**
     * The cost to build a house on the property (optional).
     */
    houseCost?: number;

    /**
     * The number of houses built on the property (optional, 0 to 4).
     */
    houses?: number | null;

    /**
     * Whether a hotel is built on the property (optional).
     */
    hotel?: boolean;

    /**
     * Whether the property is a corner space (optional).
     */
    corner?: boolean;

    /**
     * The owner of the property (optional).
     */
    owner?: Player;

    /**
     * The position of the property on the board.
     */
    position: number;

    /**
     * Checks if the property is mortgaged.
     * 
     * @returns A boolean indicating whether the property is mortgaged.
     */
    isMortgaged(): boolean;
}
