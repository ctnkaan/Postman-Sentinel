//<> with ❤️ by Postman Student Leaders

import dotenv from 'dotenv';
dotenv.config();
const Discord = require('discord.js');
const Bot = new Discord.Client();


//commands
const ScamDetector = require('./commands/scamLinkDetector');
const Faq = require('./commands/programs');

//Prefix
const prefix = "!p" 

Bot.on("ready", () => {
    console.log("I am ready!");
    Bot.user.setActivity("<> with ❤️ by Postman Student Leaders");
});

Bot.on("message", (message: any) => {
    ScamDetector.run(message);

    if ((!message.content.startsWith(prefix)) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log(command);
    
    switch (command) {
        case "programs":
            Faq.run(message, Discord);
            break;


        default:
            message.channel.send("Command not found");
    }
});


Bot.login(process.env.DISCORD_TOKEN);