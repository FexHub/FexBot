// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from "discord.js";

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Get info about crypto wallet')
        .addStringOption(option =>
            option.setName('adress')
                .setDescription('Crypto adress')
                .setRequired(true)),
    async execute(interaction) {
        // Create new variables for wallet info and transactions
        let wallet, transactions;

        // Send embed message
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                    .setColor('68ff00')
                    .setColor('68ff00')
            ]
        })

        // Fetch wallet info
        await fetch(`https://api.blockchair.com/{:btc_chain}/dashboards/address/${interaction.options.get('adress')}`).then(async res => wallet = await res.json());
    }
}