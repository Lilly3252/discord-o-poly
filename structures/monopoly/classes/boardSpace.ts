import { IProperty } from "#database/model/player";
import { IBoardSpace } from "#type/IBoardSpace";
import { Player } from "./players";
import { Property } from "./property";

export function convertToProperty(item: IBoardSpace | IProperty): Property {
    return new Property({
        cost: item.cost,
        name: item.name,
        color: item.color,
        rent: item.rent,
        multpliedrent: item.multpliedrent,
        mortgage: item.mortgage,
        mortgaged: false,
        houseCost: item.houseCost,
        houses: item.houses,
        hotel: item.hotel,
        corner: item.corner,
        owner: item.owner,
        isMortgaged: item.isMortgaged,
        type: item.type,
        position: item.position,
        group: item.group || [], // Ensure group is provided
        isOwned: false, // Default value
        isDeveloped: false, // Default value
        calculateRent: () => 0, // Placeholder function
        buyProperty: () => {}, // Placeholder function
        mortgageProperty: () => {}, // Placeholder function
        unmortgageProperty: () => {}, // Placeholder function
        ownsEntireGroup: () => false, // Placeholder function
        buildHouse: () => {}, // Placeholder function
buildHotel: () => {}, // Placeholder function
sellHouse: () => {}, // Placeholder function
sellHotel: () => {}, // Placeholder function
    });
}

   

export class BoardSpace implements IBoardSpace {
    name: string;
    type: string;
    cost?: number;
    mortgage?: number;
    color?: string;
    rent?: number;
    multpliedrent?: number[];
    group?: number[];
    houses?: number;
    houseCost?: number;
    corner?: boolean;
    owner?: Player;
    position: number;
    hotel: boolean;

    constructor(data: IBoardSpace) {
        this.name = data.name;
        this.type = data.type;
        this.cost = data.cost;
        this.mortgage = data.mortgage;
        this.color = data.color;
        this.rent = data.rent;
        this.multpliedrent = data.multpliedrent;
        this.group = data.group;
        this.houseCost = data.houseCost;
        this.houses = data.houses;
        this.hotel = data.hotel || false
        this.corner = data.corner;
        this.owner = data.owner;
        this.position = data.position;
    }

    isMortgaged(): boolean {
        return this.owner ? this.owner.isPropertyMortgaged(this.name) : false;
    }
}
