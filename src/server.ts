//<> with ❤️ by Postman Student Leaders

import dotenv from 'dotenv';
const { Client, Intents } = require("discord.js");
const Bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
dotenv.config();


const ScamDetector = require("./commands/scamLinkDetector")

const prefix = "!helper" 





Bot.on("ready", () => {
    console.log("I am ready!");
    Bot.user.setActivity("<> with ❤️ by Postman Student Leaders");
});

Bot.on("messageCreate", (message: any) => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    ScamDetector.run(message);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

});


Bot.login(process.env.DISCORD_TOKEN);