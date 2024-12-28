import { Collection } from 'discord.js';

/**
 * Represents the settings for a guild.
 */
export interface guildSetting {
    /**
     * The ID of the guild.
     */
    guildID: string;

    /**
     * The name of the guild.
     */
    name: string;

    /**
     * Whether audit log events are enabled.
     */
    auditLogEvent: boolean;

    /**
     * The ID of the log channel, or null if not set.
     */
    logChannelID: string | null;

    /**
     * The ID of the welcome channel, or null if not set.
     */
    welcomeChannelID: string | null;

    /**
     * Whether anti-raid measures are enabled.
     */
    antiRaid: boolean;

    /**
     * Whether bot updates are enabled.
     */
    botUpdate: boolean;

    /**
     * Whether role updates are enabled.
     */
    roleUpdate: boolean;

    /**
     * Whether integration updates are enabled.
     */
    integrationUpdate: boolean;

    /**
     * Whether guild updates are enabled.
     */
    guildUpdate: boolean;

    /**
     * Whether emoji updates are enabled.
     */
    emojiUpdate: boolean;

    /**
     * Whether stage instance updates are enabled.
     */
    stageInstanceUpdate: boolean;

    /**
     * Whether message updates are enabled.
     */
    messageUpdate: boolean;

    /**
     * Whether channel updates are enabled.
     */
    channelUpdate: boolean;

    /**
     * Whether sticker updates are enabled.
     */
    stickerUpdate: boolean;

    /**
     * Whether member updates are enabled.
     */
    memberUpdate: boolean;

    /**
     * Whether guild scheduled updates are enabled.
     */
    guildScheduledUpdate: boolean;

    /**
     * Whether thread updates are enabled.
     */
    threadUpdate: boolean;

    /**
     * Whether invite updates are enabled.
     */
    inviteUpdate: boolean;

    /**
     * Whether webhook updates are enabled.
     */
    webhookUpdate: boolean;

    /**
     * Whether auto-moderation is enabled.
     */
    autoModeration: boolean;

    /**
     * Whether command permissions are enabled.
     */
    commandPermission: boolean;

    /**
     * Whether URL link detection is enabled.
     */
    urlLinkDetection: boolean;

    /**
     * A collection of URL links.
     */
    urlLinks: Collection<string, links>;
}

/**
 * Represents a link with a domain.
 */
export interface links {
    /**
     * The domain of the link.
     */
    domains: string;
}

/**
 * Represents an achievement.
 */
export interface Achievement {
    /**
     * The name of the achievement.
     */
    name: string;

    /**
     * A brief description of the achievement.
     */
    description: string;

    /**
     * The date the achievement was earned.
     */
    dateEarned: Date;
}
