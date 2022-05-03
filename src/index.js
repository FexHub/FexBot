// Import modules
import Discord from 'discord.js'

// Create new Client
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", async () => {
    console.log(`\x1b[38;5;49m[✅  | Info] | We're glad to see you, ${client.user.username}!\x1b[0m`);
})

client.login("OTcwOTY4NzczMjMyMzEyMzIw.YnDrIw.8uRBVLx4UTT2O_1UGJ2RHLJAoNo");