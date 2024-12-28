// types/IBoardSpace.ts

import { Player } from "#structures/monopoly/classes/players";

/**
 * Represents a space on the Monopoly board.
 */
export interface IBoardSpace {
    /**
     * The name of the board space.
     */
    name: string;

    /**
     * The type of the board space (e.g., property, utility, etc.).
     */
    type: string;

    /**
     * The cost to purchase the board space (optional).
     */
    cost?: number;

    /**
     * The mortgage value of the board space (optional).
     */
    mortgage?: number;

    /**
     * The color group of the board space (optional).
     */
    color?: string;

    /**
     * The base rent of the board space (optional).
     */
    rent?: number;

    /**
     * The rent values when houses are built on the board space (optional).
     */
    multpliedrent?: number[];

    /**
     * The group of properties that this board space belongs to (optional).
     */
    group?: number[];

    /**
     * The cost to build a house on the board space (optional).
     */
    houseCost?: number;

    /**
     * The number of houses built on the board space (optional).
     */
    houses?: number;

    /**
     * Whether a hotel is built on the board space (optional).
     */
    hotel?: boolean;

    /**
     * Whether the board space is a corner space (optional).
     */
    corner?: boolean;

    /**
     * The owner of the board space (optional).
     */
    owner?: Player;

    /**
     * The position of the board space on the board.
     */
    position: number;

    /**
     * Checks if the board space is mortgaged.
     * 
     * @returns A boolean indicating whether the board space is mortgaged.
     */
    isMortgaged(): boolean;
}

