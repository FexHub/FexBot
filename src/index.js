// Import modules
import Discord from 'discord.js';

// Import files
import config from './files/config.json' assert { type: 'json' };
import deploy from './deploy.js';
import autocomplete from './utils/autocomplete.js';
import logs from './utils/logs.js';

// Create new Client
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Create new variable for file
let file;

// Ready event
client.once("ready", async () => {
    file = logs.createLogs(new Date());
    console.log(`\x1b[38;5;49m[✅  | Info] | We're glad to see you, ${client.user.username}!\x1b[0m`);
    logs.writeLogs(file, 'Bot successfull logged in.', new Date().toLocaleDateString(), new Date().toLocaleTimeString(), '[✅  | Info]');
    deploy(client, 'guild');
})

// Interaction created event
client.on("interactionCreate", async (interaction) => {
    if (interaction.isAutocomplete()) autocomplete(interaction);
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Try to execute command
    try {
        await command.execute(interaction);
        console.log(`\x1b[38;5;49m[⌨️   | Logs] | User ${interaction.user.username} used command \x1b[36m${interaction.commandName}\x1B[0m`);
        logs.writeLogs(file, `User ${interaction.user.username} used command ${interaction.commandName}.`, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), '[✅   | Slash commands]');
    } catch (error) {
        console.log(`\x1b[38;5;197m[❌  | Logs] | User ${interaction.user.username} caught error in command \x1b[36m${interaction.commandName}.\x1B[0m\n${error}`);
        logs.writeLogs(file, `User ${interaction.user.username} caught error in command ${interaction.commandName}.`, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), '[❌   | Slash commands]');
        await interaction.reply({ content: 'Oops, little error 😶‍🌫️', ephemeral: true });
    }
});

// Login to bot account
client.login(config.token);