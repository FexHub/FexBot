// Import modules
import Discord from 'discord.js'

// Create new Client
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Ready event
client.once("ready", async () => {
    console.log(`\x1b[38;5;49m[✅  | Info] | We're glad to see you, ${client.user.username}!\x1b[0m`);
})

// Login to bot account
client.login("");