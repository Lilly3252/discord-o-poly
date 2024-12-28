import { IPlayer } from '#type/IPlayers';
import { IProperty } from '#type/IProperty';
import mongoose, { Schema } from 'mongoose';


const PlayerSchema: Schema = new Schema({
    userId: { type: String, required: true }, 
    name: { type: String, required: true },
    position: { type: Number, default: 0 },
    money: { type: Number, default: 1500 },
    properties: { type: [{
        name: { type: String, required: true },
        mortgaged: { type: Boolean, default: false },
        house: { type: Number, default: 0 },
        houses: { type: Number, default: 0 },
        group: { type: [Number], default: [] }
    }], default: [] },
    inJail: { type: Boolean, default: false },
    getOutOfJailFreeCards: { type: Number, default: 0 },
    isBankrupt: { type: Boolean, default: false },
    jailTurns: { type: Number, default: 0 },
    achievements: { 
        type: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
            dateEarned: { type: Date, default: Date.now }
        }], 
        default: [] 
    }
});

const PlayerModel = mongoose.model<IPlayer>('Player', PlayerSchema);

export { IPlayer, IProperty, PlayerModel };

