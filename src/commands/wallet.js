// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js";

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Get info about crypto wallet')
        .addStringOption(option =>
            option.setName('address')
                .setDescription('Crypto address')
                .setRequired(true)),
    async execute(interaction) {
    // Maybe later...
    },
};