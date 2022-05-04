// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from "discord.js";
import * as fetch from "node-fetch";

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get info about client and Discord API latency'),
    async execute(interaction) {

        // Create new variable for Discord API latency
        let ping;

        // Fetch Discord API latency
        await fetch('https://discordstatus.com/metrics-display/ztt4777v23lf/day.json').then(async r => {
            ping = (await r.json()).summary.last;
        });

        // Send message
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }))
					.setColor('68ff00')
					.setDescription(`**🏓 Pong!**\n**Client latency: \`${interaction.client.ws.ping} ms\`**\n**Discord API latency: \`${ping} ms\`**`)
            ]
        })
    }
}