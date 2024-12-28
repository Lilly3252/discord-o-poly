import Utility from "#structures/util";
import { event } from "#type/event";
import { Collection } from "discord.js";
import { ContextCommand } from "./contextCommands";
import { ModalCommand } from "./modalCommands";
import { SlashCommand } from "./slashCommands";
import { SelectMenu } from "./stringSelectMenuCommands";

/**
 * Extends the discord.js Client interface to include custom properties.
 */
declare module 'discord.js' {
    interface Client {
        /**
         * Utility functions for the client.
         */
        utils: Utility;

        /**
         * Collection of commands, including Slash and Context commands.
         */
        commands: Collection<string, SlashCommand | ContextCommand>;

        /**
         * Collection of events.
         */
        event: Collection<string, event>;

        /**
         * Collection of modal commands.
         */
        modals: Collection<string, ModalCommand>;

        /**
         * Collection of select menu commands.
         */
        selectMenu: Collection<string, SelectMenu>;
    }
}

