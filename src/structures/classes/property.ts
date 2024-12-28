import { IProperty } from "src/database/player.js";
import { Player } from "./players.js";


/**
 * Represents a property in the Monopoly game.
 */
export class Property implements IProperty {
    name: string;
    type: string;
    cost: number;
    mortgage: number;
    mortgaged: boolean;
    color: string;
    rent: number;
    multpliedrent: number[];
    group: number[];
    houseCost: number;
    houses: number | null;
    hotel: boolean;
    corner: boolean;
    owner: Player | undefined;
    position: number;
    isOwned: boolean = false;
    isDeveloped: boolean = false;

    constructor(data: Property) {
        this.name = data.name;
        this.type = 'property'; // default type
        this.cost = data.cost;
        this.mortgage = data.mortgage;
        this.mortgaged = false;
        this.color = data.color;
        this.rent = data.rent;
        this.multpliedrent = data.multpliedrent;
        this.group = data.group;
        this.houseCost = data.houseCost;
        this.houses = 0;
        this.hotel = false;
        this.corner = false;
        this.owner = data.owner;
        this.position = data.position;
    }

    isMortgaged(): boolean {
        return this.mortgaged;
    }

    calculateRent(): number {
        if (this.hotel) {
            return this.multpliedrent[4];
        } else if (this.houses! > 0) {
            return this.multpliedrent[this.houses! - 1];
        } else {
            return this.rent;
        }
    }

    buyProperty(player: Player): void {
        if (!this.isOwned) {
            this.owner = player;
            this.isOwned = true;
            player.money -= this.cost;

            const newProperty: IProperty = {
                name: this.name,
                type: 'property',
                cost: this.cost,
                mortgage: this.mortgage,
                mortgaged: this.mortgaged,
                color: this.color,
                rent: this.rent,
                multpliedrent: this.multpliedrent,
                group: this.group,
                houseCost: this.houseCost,
                houses: this.houses,
                hotel: this.hotel,
                corner: this.corner,
                owner: player,
                position: player.position,
                isMortgaged: () => this.mortgaged
            };

            player.properties.push(newProperty);
            player.save();
        }
    }

    mortgageProperty(): void {
        if (!this.isMortgaged()) {
            this.mortgaged = true;
            this.owner!.money += this.mortgage;
            this.owner!.save();
        }
    }

    unmortgageProperty(): void {
        if (this.isMortgaged()) {
            this.mortgaged = false;
            this.owner!.money -= this.mortgage;
            this.owner!.save();
        }
    }

    ownsEntireGroup(properties: Property[]): boolean {
        const groupKey = `${this.group[0]}-${this.group[2]}`;
        const totalPropertiesInGroup = this.group[2];
        const ownedPropertiesInGroup = properties.filter(property => {
            return property.group[0] === this.group[0] && property.group[2] === this.group[2] && property.owner === this.owner;
        }).length;

        return ownedPropertiesInGroup === totalPropertiesInGroup;
    }

    buildHouse(properties: Property[]): void {
        if (this.houses! < 4 && !this.hotel && this.ownsEntireGroup(properties)) {
            this.houses! += 1;
            this.owner!.money -= this.houses!;
            this.isDeveloped = true;
            this.owner!.save();
        }
    }

    buildHotel(properties: Property[]): void {
        if (this.houses === 4 && !this.hotel && this.ownsEntireGroup(properties)) {
            this.hotel = true;
            this.houses = 0;
            this.owner!.money -= this.houseCost;
            this.isDeveloped = true;
            this.owner!.save();
        }
    }

    sellHouse(): void {
        if (this.houses! > 0) {
            this.houses! -= 1;
            this.owner!.money += this.houseCost / 2;
            if (this.houses === 0 && !this.hotel) {
                this.isDeveloped = false;
            }
            this.owner!.save();
        }
    }

    sellHotel(): void {
        if (this.hotel) {
            this.hotel = false;
            this.houses = 4;
            this.owner!.money += this.houseCost / 2;
            this.isDeveloped = false;
            this.owner!.save();
        }
    }
}
