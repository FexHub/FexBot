// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js";
import translate from '@vitalets/google-translate-api';

// Create new slash command
export default {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to translate')
                .setRequired(true)),
    async execute(interaction) {
        // Send embed message
        const reply = await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                    .setColor('#68ff00')
                    .setDescription('**🗺️ Select language**')
            ], components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('language')
                            .setPlaceholder('Nothing selected')
                            .addOptions([
                                {
                                    label: 'Belarusian',
                                    description: 'Translate to Belarusian',
                                    value: 'be',
                                    emoji: '🇧🇾'
                                },
                                {
                                    label: 'Ukrainian',
                                    description: 'Translate to Ukrainian',
                                    value: 'uk',
                                    emoji: '🇺🇦',
                                },
                                {
                                    label: 'Polish',
                                    description: 'Translate to Polish',
                                    value: 'pl',
                                    emoji: '🇵🇱'
                                },
                                {
                                    label: 'Russian',
                                    description: 'Translate to Russian',
                                    value: 'ru',
                                    emoji: '🇷🇺'
                                },
                                {
                                    label: 'Chinese',
                                    description: 'Translate to Chinese',
                                    value: 'zh-TW',
                                    emoji: '🇨🇳'
                                },
                                {
                                    label: 'Japanese',
                                    description: 'Translate to Japanese',
                                    value: 'ja',
                                    emoji: '🇯🇵'
                                },
                                {
                                    label: 'Arabic',
                                    description: 'Translate to Arabic',
                                    value: 'ar',
                                    emoji: '🇦🇪'
                                },
                                {
                                    label: 'German',
                                    description: 'Translate to German',
                                    value: 'de',
                                    emoji: '🇩🇪'
                                },
                                {
                                    label: 'English',
                                    description: 'Translate to English',
                                    value: 'en',
                                    emoji: '🇺🇸'
                                }
                            ])
                    )
            ], fetchReply: true
        });

        // Filter
        const filter = (int) => int.user.id === interaction.user.id;

        // Create collector
        const collector = reply.createMessageComponentCollector({ filter, max: 1 });
        collector.on('collect', async (i) => {
            // Translate text
            const translated = await translate(interaction.options.getString('text'), { to: i.values[0] }).then(res => res.text);
            // Edit embed message
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                        .setColor('#68ff00')
                        .addFields(
                            {
                                inline: true, name: '📜 Text', value: `**\`${interaction.options.getString('text')}\`**`
                            },
                            {
                                inline: true, name: '🗺️ Translated text', value: `**\`${translated}\`**`
                            }
                        )
                ], components: []
            });
        })
    }
}