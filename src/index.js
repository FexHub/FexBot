const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", async () => {
    console.log(`\x1b[38;5;49m[✅  | Info] | We're glad to see you, ${client.user.username}!\x1b[0m`);
})

client.login("OTcwOTY4NzczMjMyMzEyMzIw.YnDrIw.jZkgKJK3-EAhesF1Ev4QBoOQ8_w");