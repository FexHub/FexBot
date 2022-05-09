// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from "discord.js";

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get avatar of user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('User')
                .setRequired(false)),
    async execute(interaction) {
        // Send embed message
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                    .setColor('68ff00')
                    .setTitle(interaction.options.getMentionable('user') ? `${interaction.options.getMentionable('user').user.username} avatar` : 'Your avatar')
                    .setImage(interaction.options.getMentionable('user') ? interaction.options.getMentionable('user').displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) : interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }))
            ]
        })
    }
}