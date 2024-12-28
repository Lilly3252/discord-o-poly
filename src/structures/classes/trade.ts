
import { ITrade } from "../types/monopoly/ITrade.js";
import { Player } from "./players.js";
import { Property } from "./property.js";


/**
 * Represents a trade between two players in the Monopoly game.
 */
export class Trade implements ITrade {
    fromPlayer: Player;
    toPlayer: Player;
    property: Property;
    amount: number;
    isAccepted: boolean;

    constructor(fromPlayer: Player, toPlayer: Player, property: Property, amount: number) {
        this.fromPlayer = fromPlayer;
        this.toPlayer = toPlayer;
        this.property = property;
        this.amount = amount;
        this.isAccepted = false;
    }

    validateTrade(): boolean {
        if (this.fromPlayer.properties.some(p => p.name === this.property.name)) {
            return true;
        } else {
            console.log(`${this.fromPlayer.name} does not own ${this.property.name}`);
            return false;
        }
    }

    executeTrade(): void {
        if (this.validateTrade() && this.isAccepted) {
            this.updatePlayerMoney();
            this.updatePlayerProperties();
            console.log(`${this.fromPlayer.name} traded ${this.property.name} to ${this.toPlayer.name} for $${this.amount}`);
        } else {
            console.log(`Trade not executed. Either validation failed or trade was not accepted.`);
        }
    }

    updatePlayerProperties(): void {
        this.fromPlayer.properties = this.fromPlayer.properties.filter(p => p.name !== this.property.name);
        this.toPlayer.addProperty(this.property.name);
        this.property.owner = this.toPlayer;
    }

    updatePlayerMoney(): void {
        this.fromPlayer.updateMoney(this.amount);
        this.toPlayer.updateMoney(-this.amount);
    }

    acceptTrade(): void {
        this.isAccepted = true;
        console.log(`${this.toPlayer.name} accepted the trade.`);
    }

    rejectTrade(): void {
        this.isAccepted = false;
        console.log(`${this.toPlayer.name} rejected the trade.`);
    }

    cancelTrade(): void {
        this.isAccepted = false;
        console.log(`Trade between ${this.fromPlayer.name} and ${this.toPlayer.name} has been cancelled.`);
    }
}
