//<> with ❤️ by Postman Student Leaders

import dotenv from 'dotenv';
dotenv.config();
const { Client, Intents } = require("discord.js");
const Bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const fs = require('fs');


const ScamDetector = require('./commands/scamLinkDetector');
const Faq = require('./commands/faq');

//Prefix
const prefix = "!p" 

Bot.on("ready", () => {
    console.log("I am ready!");
    Bot.user.setActivity("<> with ❤️ by Postman Student Leaders");
});

Bot.on("messageCreate", (message: any) => {

    ScamDetector.run(message);

    if ((!message.content.startsWith(prefix)) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "faq":
            Faq.run(message);
            break;

        default:
            message.channel.send("Command not found");
    }
});


Bot.login(process.env.DISCORD_TOKEN);