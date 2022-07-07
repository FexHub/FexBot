/*
This file uses in ready event for deploy your new slash commands
Note: Remember to change your token and (if you need) guild ID in config.json
And so on. You need to install modules by this command => npm install @discordjs/builders @discordjs/rest discord-api-types
*/

// Import modules
import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { resolve } from 'path';
import fs from 'fs';

// Import config
import config from './files/config.json' assert { type: 'json' };

// Create new function
async function deploy(client, type = 'global') {
    client.commands = new Collection();

    // Fetch commands
    const files = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    // Upload commands to collection
    for (const file of files) {
        const command = (await import(`file://${resolve('./src/commands', file)}`)).default;
        client.commands.set(command.data.name, command);
    }

    // Create new array
    let commands = [];

    // Push all commands to array
    client.commands.forEach(cmd => {
        commands.push(cmd.data);
    });

    // Create new REST
    const rest = new REST({ version: '9' }).setToken(config.token); // Note: Remember to change your bot token in config.json

    console.log(`\x1b[38;5;49m[🔄  | Slash commands] | Started updating slash commands.\x1B[0m`);
    // Upload slash commands
    try {
        if (type === 'guild') {
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, config.guildID),
                {
                    body: commands
                },
            );
            console.log(`\x1b[38;5;49m[✅  | Slash commands] | Guild commands successfull uploaded.\x1B[0m`);
        } else if (type === 'global') {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                {
                    body: commands
                },
            );
            console.log(`\x1b[38;5;49m[✅  | Slash commands] | Global commands successfull uploaded.\x1B[0m`);
        } else {
            console.log(`\x1b[38;5;197m[🤔  | Slash commands] | Enter correct type.\x1B[0m`);
        }
    } catch (err) {
        console.log(`\x1b[38;5;197m[❌  | Slash commands] | Error.\x1B[0m\n${err}`);
    }
}

export default deploy;