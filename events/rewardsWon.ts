import { Achievement } from '#structures/monopoly/classes/rewards';
import { MonopolyEventPayloads } from '#type/event';
import type { event } from '#type/event.js';
import { RewardType } from '#type/rewards';

export const name: event['name'] = 'rewardWon';
export const once: event['once'] = false;

export const run: event['run'] = async (data: MonopolyEventPayloads['rewardWon']): Promise<any> => {
    console.log(`Player ${data.playerId} won the reward: ${data.rewardType}`);
    
    switch (data.rewardType) {
        case RewardType.PropertyMogul:
        case RewardType.HotelTycoon:
        case RewardType.RailroadBaron:
        case RewardType.UtilityMaster:
        case RewardType.RentCollector:
        case RewardType.LuckyRoller:
        case RewardType.CommunityHelper:
        case RewardType.ChanceTaker:
        case RewardType.JailBreaker:
        case RewardType.BigSpender:
        case RewardType.MonopolyMaster:
        case RewardType.BankruptcySurvivor:
        case RewardType.TradeExpert:
        case RewardType.FirstPurchase:
        case RewardType.FirstRent:
        case RewardType.FirstHouse:
        case RewardType.FirstHotel:
        case RewardType.FirstTrade:
        case RewardType.FirstJail:
        case RewardType.FirstGetOutOfJail:
        case RewardType.FirstBankruptcy:
        case RewardType.FirstWin:
            await Achievement.checkAndSaveAchievement(data.playerId, data.rewardType);
            break;
    
        default:
            console.log(`Unknown reward type: ${data.rewardType}`);
            break;
    }
};
