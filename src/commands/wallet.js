// Import modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js";

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
        // Create new variables for wallet info, adress and transactions
        let wallet, adress, transactions;

        // Send embed message
        const reply = await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                    .setColor('68ff00')
                    .setDescription('**👛 Select blockchain**')

            ], components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('currency')
                            .setPlaceholder('Nothing selected')
                            .addOptions([
                                {
                                    label: 'BTC',
                                    description: 'Select Bitcoin',
                                    value: 'bitcoin',
                                    emoji: {
                                        name: 'bitcoin',
                                        id: '973665330771664928'
                                    }
                                },
                                {
                                    label: 'ETH',
                                    description: 'Select Ethereum',
                                    value: 'ethereum',
                                    emoji: {
                                        name: 'ethereum',
                                        id: '973665331266588743'
                                    }
                                },
                                {
                                    label: 'LTC',
                                    description: 'Select Litecoin',
                                    value: 'litecoin',
                                    emoji: {
                                        name: 'litecoin',
                                        id: '973665330759102525'
                                    }
                                },
                                {
                                    label: 'ADA',
                                    description: 'Select Cardano',
                                    value: 'cardano',
                                    emoji: {
                                        name: 'cardano',
                                        id: '973665331254034532'
                                    }
                                },
                                {
                                    label: 'XRP',
                                    description: 'Select Ripple',
                                    value: 'ripple',
                                    emoji: {
                                        name: 'ripple',
                                        id: '973665331287584768'
                                    }
                                },
                                {
                                    label: 'DOGE',
                                    description: 'Select Dogecoin',
                                    value: 'dogecoin',
                                    emoji: {
                                        name: 'dogecoin',
                                        id: '973665331274993684'
                                    }
                                },
                                {
                                    label: 'BCH',
                                    description: 'Select Bitcoin Cash',
                                    value: 'bitcoin-cash',
                                    emoji: {
                                        name: 'bitcoin-cash',
                                        id: '973665331803467826'
                                    }
                                },
                                {
                                    label: 'XMR',
                                    description: 'Select Monero',
                                    value: 'monero',
                                    emoji: {
                                        name: 'monero',
                                        id: '973806657358405663'
                                    }
                                },
                                {
                                    label: 'BSV',
                                    description: 'Select Bitcoin SV',
                                    value: 'bitcoin-sv',
                                    emoji: {
                                        name: 'bitcoin-sv',
                                        id: '973666100346773584'
                                    }
                                },
                                {
                                    label: 'USDT',
                                    description: 'Select USDT',
                                    value: 'usdt',
                                    emoji: {
                                        name: 'usdt',
                                        id: '973666100405489704'
                                    }
                                },
                                {
                                    label: 'DASH',
                                    description: 'Select Dash blockchain',
                                    value: 'dash',
                                    emoji: {
                                        name: 'dash',
                                        id: '973665331816063006'
                                    }
                                }
                            ])
                    )
            ], fetchReply: true
        })

        // Filter
        const filter = (int) => int.user.id === interaction.user.id;

        // Create collector
        const collector = reply.createMessageComponentCollector({ filter, max: 1 });
        collector.on('collect', async (i) => {
            adress = interaction.options.getString('adress');
            // Fetch wallet info
            try {
                await fetch(`https://api.blockchair.com/${i.values[0]}/dashboards/address/${adress}`).then(async res => wallet = await res.json());
            } catch (err) {
                console.log(`\x1b[38;5;197m[❌  | Logs] | User ${interaction.user.username} caught error in command \x1b[36m${interaction.commandName}.\x1B[0m\n${error}`);
            }
            if (wallet.data[adress].transactions[0] !== undefined) {
                // Fetch 1st transaction
                await fetch(`https://api.blockchair.com/${i.values[0]}/dashboards/transaction/${wallet.data[adress].transactions[0]}`).then(async res => {
                    let trans1 = await res.json();
                    transactions = [
                        {
                            block_id: `${trans1.data[wallet.data[adress].transactions[0]].transaction.block_id}`,
                            amount: `${trans1.data[wallet.data[adress].transactions[0]].transaction.input_total / 100000000}`,
                            amount_usd: `${trans1.data[wallet.data[adress].transactions[0]].transaction.input_total_usd}`,
                            fee: `${trans1.data[wallet.data[adress].transactions[0]].transaction.fee}`,
                        }
                    ]
                    if (wallet.data[adress].transactions[1] !== undefined) {
                        // Fetch 2nd transaction
                        await fetch(`https://api.blockchair.com/${i.values[0]}/dashboards/transaction/${wallet.data[adress].transactions[1]}`).then(async res => {
                            let trans2 = await res.json();
                            transactions = [
                                ...transactions,
                                {
                                    block_id: `${trans2.data[wallet.data[adress].transactions[1]].transaction.block_id}`,
                                    amount: `${trans2.data[wallet.data[adress].transactions[1]].transaction.input_total / 100000000}`,
                                    amount_usd: `${trans2.data[wallet.data[adress].transactions[1]].transaction.input_total_usd}`,
                                    fee: `${trans2.data[wallet.data[adress].transactions[1]].transaction.fee}`,
                                }
                            ]
                        })
                    }
                    if (wallet.data[adress].transactions[2] !== undefined) {
                        // Fetch 3rd transaction
                        await fetch(`https://api.blockchair.com/${i.values[0]}/dashboards/transaction/${wallet.data[adress].transactions[2]}`).then(async res => {
                            let trans3 = await res.json();
                            transactions = [
                                ...transactions,
                                {
                                    block_id: `${trans3.data[wallet.data[adress].transactions[2]].transaction.block_id}`,
                                    amount: `${trans3.data[wallet.data[adress].transactions[2]].transaction.input_total / 100000000}`,
                                    amount_usd: `${trans3.data[wallet.data[adress].transactions[2]].transaction.input_total_usd}`,
                                    fee: `${trans3.data[wallet.data[adress].transactions[2]].transaction.fee}`,
                                }
                            ]
                            await interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }) })
                                        .setColor('68ff00')
                                        .addFields(
                                            {
                                                name: `ℹ️ Info`,
                                                value: `**\`Balance: ${wallet.data[adress].address.balance}\` ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])} \`(${wallet.data[adress].address.balance_usd} USD\`**`
                                            },
                                            {
                                                name: '\u200B',
                                                value: '\u200B'
                                            },
                                            transactions[0] !== undefined ? {
                                                name: '✨ 1 Transaction',
                                                value: `**\`Block id: ${transactions[0].block_id}\`**\n**\`Amount: ${transactions[0].amount} ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])} (${transactions[0].amount_usd} USD)\`**\n**\`Fee: ${transactions[0].fee} ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])}**`,
                                                inline: true
                                            } : false,
                                            transactions[1] !== undefined ? {
                                                name: '✨ 2 Transaction',
                                                value: `**\`Block id: ${transactions[1].block_id}\`**\n**\`Amount: ${transactions[1].amount} ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])} (${transactions[1].amount_usd} USD)\`**\n**\`Fee: ${transactions[1].fee} ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])}**`,
                                                inline: true
                                            } : false,
                                            transactions[2] !== undefined ? {
                                                name: '✨ 2 Transaction',
                                                value: `**\`Block id: ${transactions[2].block_id}\`**\n**\`Amount: ${transactions[2].amount} ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])} (${transactions[2].amount_usd} USD)\`**\n**\`Fee: ${transactions[2].fee} ${interaction.client.emojis.cache.find(emoji => emoji.name === i.values[0])}**`,
                                                inline: true
                                            } : false,
                                        )
                                ]
                            })
                        })
                    }
                })
            }
        });
    },
};