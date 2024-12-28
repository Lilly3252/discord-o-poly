
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';
import * as process from 'node:process';
import Util from './util.js';

config();

export default class client extends Client {
   

    public constructor() {
        super({
            partials: [
                Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,
                Partials.GuildMember, Partials.GuildScheduledEvent, Partials.ThreadMember
            ],
            intents: [
                GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
                GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution
            ],
        });
        this.commands = new Collection();
        this.event = new Collection();
        this.utils = new Util(this);
    }

    private async loadCommands() {
        await this.utils.loadCommands();
    }

    private async loadEvents() {
        await this.utils.loadEvents();
    }

    public async start() {
        try {
            await this.loadCommands();
            await this.loadEvents();
            await super.login(process.env.TOKEN);
        } catch (error) {
            console.error('Error starting the bot:', error);
        }
    }
}