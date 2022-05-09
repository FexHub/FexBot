// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from "discord.js";

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get weather')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('City name')
                .setRequired(true)),
    async execute(interaction) {
        // Create new variable for weather
        let result;

        // Fetch weather
        try {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${interaction.options.getString('city')}&appid=47759bb176cbf2f4495a3aab6b1b9f1e&units=metric`).then(async res => result = await res.json());
        } catch (error) {
            console.log(`\x1b[38;5;197m[❌  | Logs] | User ${interaction.user.username} caught error in command \x1b[36m${interaction.commandName}.\x1B[0m\n${error}`);
        }

        // Send embed message
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                    .setColor('68ff00')
                    .setTitle(result.weather[0].main)
                    .addFields(
                        { name: '🌡️ Temperature', value: `**\`${result.main.temp}°C\`**`, inline: true },
                        { name: '💧 Humidity', value: `**\`${result.main.humidity}%\`**`, inline: true },
                        { name: '💨 Wind', value: `**\`${result.wind.speed} m/s\`**`, inline: true },
                    )
                    .setThumbnail(`https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`)
            ]
        })
    }
}