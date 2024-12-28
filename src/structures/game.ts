
import { readFileSync } from "node:fs";
import { loadCardData } from "src/database/database.js";
import { BoardSpace } from "./classes/boardSpace.js";

export const boardData: BoardSpace[] = JSON.parse(readFileSync('board.json', 'utf-8'));
export const chanceCards = loadCardData('src/structures/monopoly/JSON/chance.json');
export const communityChestCards = loadCardData('src/structures/monopoly/JSON/community.json');
export const gameDataMap = new Map()