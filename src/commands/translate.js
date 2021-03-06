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
                    .setDescription('**πΊοΈ Select language**')
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
                                    emoji: 'π§πΎ'
                                },
                                {
                                    label: 'Ukrainian',
                                    description: 'Translate to Ukrainian',
                                    value: 'uk',
                                    emoji: 'πΊπ¦',
                                },
                                {
                                    label: 'Polish',
                                    description: 'Translate to Polish',
                                    value: 'pl',
                                    emoji: 'π΅π±'
                                },
                                {
                                    label: 'russian',
                                    description: 'Translate to russian',
                                    value: 'ru',
                                    emoji: 'π·πΊ'
                                },
                                {
                                    label: 'Chinese',
                                    description: 'Translate to Chinese',
                                    value: 'zh-TW',
                                    emoji: 'π¨π³'
                                },
                                {
                                    label: 'Japanese',
                                    description: 'Translate to Japanese',
                                    value: 'ja',
                                    emoji: 'π―π΅'
                                },
                                {
                                    label: 'Arabic',
                                    description: 'Translate to Arabic',
                                    value: 'ar',
                                    emoji: 'π¦πͺ'
                                },
                                {
                                    label: 'German',
                                    description: 'Translate to German',
                                    value: 'de',
                                    emoji: 'π©πͺ'
                                },
                                {
                                    label: 'English',
                                    description: 'Translate to English',
                                    value: 'en',
                                    emoji: 'πΊπΈ'
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
            let translated = await translate(interaction.options.getString('text'), { to: i.values[0] }).then(res => res.text);
            translated = translated.length >= 950 ? `${translated.slice(0, 950)} and ${translated.length - 950 || 0} more` : `${translated}`;
            // Edit embed message
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                        .setColor('#68ff00')
                        .addFields(
                            {
                                name: 'π Text', value: `${interaction.options.getString('text').length >= 950 ? `${interaction.options.getString('text').slice(0, 950)} and ${interaction.options.getString('text').length - 950 || 0} more` : `${interaction.options.getString('text')}`}`
                            },
                            {
                                name: 'πΊοΈ Translated text', value: `${translated}`
                            }
                        )
                ], components: []
            });
        })
    }
}