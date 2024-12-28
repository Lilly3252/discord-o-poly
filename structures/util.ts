
import fs from 'fs';

import { event } from "#type/event.js";
import { SlashCommand } from '#type/slashCommands.js';
import type lillyclient from './lillyClient.js';
const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;

/**
 * Represents a utility class for managing commands and events.
 */
export default class Utility {
    /**
     * The client associated with the utility.
     */
    client: lillyclient;

    /**
     * Creates an instance of the Utility class.
     * 
     * @param a - The client to associate with the utility.
     */
    constructor(a: lillyclient) {
        this.client = a;
    }

    /**
     * Loads commands from the specified folders.
     */
    async loadCommands() {
        const commandFolders = ['fun', 'utilities'];
        await Promise.all(commandFolders.flatMap(folder =>
            fs.readdirSync(`./dist/src/commands/${folder}/`)
                .filter(file => file.endsWith('.js'))
                .map(async file => {
                    const { slashy, run }: { slashy: SlashCommand['slashy'], run: SlashCommand['run'] } = await import(`../commands/${folder}/${file}`);
                    this.client.commands.set(slashy.name, { slashy, run });
                })
        ));
    }

    /**
     * Loads events from the specified folder.
     */
    async loadEvents() {
        const eventFiles = fs.readdirSync(`./dist/src/events`).filter(file => file.endsWith('.js'));
        await Promise.all(eventFiles.map(async eventFile => {
            const { name, once, run }: { name: event['name'], once: event['once'], run: event['run'] } = await import(`../events/${eventFile}`);
            const handler = (...args: any[]) => run(...args);
            once ? this.client.once(name, handler) : this.client.on(name, handler);
        }));
    }
}

