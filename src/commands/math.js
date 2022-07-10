// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from "discord.js";

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Calculate math expression')
        .addStringOption(option =>
            option.setName('expression')
                .setDescription('Math expression')
                .setRequired(true)
                .setAutocomplete(true)),
    async execute(interaction) {
        // Create new variable for result
        let result;

        // Fetch result
        try {
            await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(interaction.options.getString('expression'))}`).then(async res => result = await res.text());
        } catch (err) {
            console.log(`\x1b[38;5;197m[❌  | Logs] | User ${interaction.user.username} caught error in command \x1b[36m${interaction.commandName}.\x1B[0m\n${err}`);
        }

        // Send embed message
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                    .setColor('#68ff00')
                    .addFields(
                        { inline: true, name: '🧮 Expression', value: `${interaction.options.getString('expression') || ' '}` },
                        { inline: true, name: '📈 Result', value: `${result}` }
                    )
            ]
        })
    }
}