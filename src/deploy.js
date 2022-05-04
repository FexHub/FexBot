/*
This file uses in ready event for deploy your new slash commands
Note: Remember to change your token and (if you need) guild ID(s) in config.json
And so on. You need to install modules by this command => npm install @discordjs/builders @discordjs/rest discord-api-types
*/

// Import modules
import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from 'fs';

// Import config
import config from './files/config.json' assert { type: 'json' };

// Create new function
async function deploy(client, type = 'server') {
    client.commands = new Collection();

    // Fetch commands
    const files = await fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    // Upload commands to collection
    for (const file of files) {
        const command = await import(`./commands/${file}`);
        client.commands.set(command.default.data.name, command);
    }

    // Create new array
    let commands = [];

    // Push all commands to array
    client.commands.forEach(cmd => {
        commands.push(cmd.default.data);
    });

    // Create new REST
    const rest = new REST({ version: '9' }).setToken(config.token); // Note: Remember to change your bot token in config.json

    console.log(`\x1b[38;5;49m[🔄  | Slash commands] | Started updating slash commands.\x1B[0m`);
    // Upload slash commands
        if (type === 'server') {
            await rest.put(
                Routes.applicationGuildCommands('970968773232312320', config.guildID),
                {
                    body: commands
                },
            );
        } else if (type === 'global') {
            await rest.put(
                Routes.applicationCommands(clientID),
                {
                    body: commands
                },
            );
        } else {
            console.log(`\x1b[38;5;197m[❌  | Slash commands] Enter correct type.\x1B[0m`);
        }
}

export default deploy;