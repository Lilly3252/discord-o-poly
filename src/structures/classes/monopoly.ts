// models/MonopolyGame.ts
import { getPlayerData, savePlayerData } from '#database/model/database';
import { CommandInteraction } from 'discord.js';


import { IMonopolyGame } from '#type/IMonopoly';
import { BoardSpace } from './boardSpace';
import { Card } from './card';
import { Deck } from './deck';
import { Player } from './players';
import { Achievement } from './rewards';
import { TurnManager } from './turnManager';

/**
 * Represents a Monopoly game.
 */
export class MonopolyGame implements IMonopolyGame {
    players: Player[];
    board: BoardSpace[];
    turnManager: TurnManager;
    chanceDeck: Deck;
    communityChestDeck: Deck;
    freeParkingMoney: number;
    interaction: CommandInteraction;

    constructor(players: Player[], board: BoardSpace[], chanceCards: Card[], communityChestCards: Card[]) {
        this.players = players;
        this.board = board;
        this.turnManager = new TurnManager(players);
        this.chanceDeck = new Deck(chanceCards);
        this.communityChestDeck = new Deck(communityChestCards);
        this.freeParkingMoney = 0;
    }

    async savePlayerData(player: Player): Promise<void> {
        const playerData = await getPlayerData(player.name);
        if (playerData) {
            playerData.position = player.position;
            playerData.money = player.money;
            playerData.properties = player.properties;
            playerData.inJail = player.inJail;
            playerData.getOutOfJailFreeCards = player.getOutOfJailFreeCards;
            await savePlayerData(playerData);
        }
    }

    addPlayer(player: Player): void {
        this.players.push(player);
        this.turnManager.players = this.players; // Update the TurnManager's player list
    }

    nextTurn(): void {
        const currentPlayer = this.turnManager.getCurrentPlayer();
        const diceRoll = this.rollDice();
        currentPlayer.move(diceRoll, this.board);

        // Handle landing on a space (e.g., property, Chance, Community Chest)
        this.handleSpace(currentPlayer);

        // Move to the next player
        this.turnManager.nextTurn();
    }

    rollDice(): number {
        return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    }

    handleSpace(player: Player): void {
        const space = this.board[player.position];
        console.log(`${player.name} landed on ${space.name}`);

        // Implement logic for handling different types of spaces
        if (space.type === 'property') {
            this.handleProperty(player, space);
        } else if (space.type === 'chance') {
            this.handleChance(player,this.interaction);
        } else if (space.type === 'community-chest') {
            this.handleCommunityChest(player , this.interaction);
        } else if (space.type === 'tax') {
            this.handleTax(player, space);
        } else if (space.type === 'jail') {
            this.sendToJail(player);
        } else if (space.type === 'free-parking') {
            this.handleFreeParking(player);
        } else if (space.type === 'go') {
            this.handleGo(player);
        } else if (space.type === 'go-to-jail') {
            this.handleGoToJail(player);
        }
    }

    handleProperty(player: Player, space: BoardSpace): void {
        // Implement logic for handling property spaces
        console.log(`${player.name} can buy the property ${space.name} for $${space.cost}`);
    }

    handleChance(player: Player, interaction: CommandInteraction): void {
        const drawnCard = this.chanceDeck.drawCard();
        if (drawnCard) {
            interaction.followUp(`You drew a Chance card: ${drawnCard.description}`);
            drawnCard.executeAction(this, player);
            player.addDrawnCard(player, drawnCard);
            Achievement.checkChanceTaker(this.players, player.chanceCardsDrawn);
        }
    }

    handleCommunityChest(player: Player, interaction: CommandInteraction): void {
        const drawnCard = this.communityChestDeck.drawCard();
        if (drawnCard) {
            interaction.followUp(`You drew a Community Chest card: ${drawnCard.description}`);
            drawnCard.executeAction(this, player);
            player.addDrawnCard(player, drawnCard);
            Achievement.checkCommunityHelper(this.players, player.communityChestCardsDrawn);
        }
    }

    handleTax(player: Player, space: BoardSpace): void {
        player.updateMoney(-space.cost);
        this.freeParkingMoney += space.cost;
        console.log(`${player.name} pays $${space.cost} in taxes`);
    }

    sendToJail(player: Player): void {
        player.position = this.board.findIndex(space => space.type === 'jail');
        player.inJail = true;
        console.log(`${player.name} is sent to Jail!`);
    }

    handleFreeParking(player: Player): void {
        player.updateMoney(this.freeParkingMoney);
        console.log(`${player.name} collects $${this.freeParkingMoney} from Free Parking`);
        this.freeParkingMoney = 0;
    }

    handleGo(player: Player): void {
        player.updateMoney(200);
        console.log(`${player.name} collects $200 for passing Go`);
    }

    handleGoToJail(player: Player): void {
        this.sendToJail(player);
    }

    drawChanceCard(): Card {
        return this.chanceDeck.drawCard();
    }

    drawCommunityChestCard(): Card {
        return this.communityChestDeck.drawCard();
    }
}
