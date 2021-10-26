//<> with ❤️ by Postman Student Leaders

import dotenv from 'dotenv';
import { meme } from 'memejs';
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();


//commands
const ScamDetector = require('./commands/scamLinkDetector');
const Programs = require('./commands/programs');
const Translate = require('./commands/translate');
const Help = require('./commands/help');
const Meme = require('./commands/meme');

//Prefix
const prefix = "!p" 

client.on("ready", () => {
    console.log("I am ready!");
    client.user.setActivity("<> with ❤️ by Postman Student Leaders");
});

client.on("message", (message: any) => {

    if (message.author.bot) return;
    
    ScamDetector.run(message, client);

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    
    switch (command) {
        case "programs":
            Programs.run(message, Discord);
            break;
        
        case "translate":
            Translate.run(message, Discord, args);
            break;

        case "help":
            Help.run(message, Discord);
            break;

        case "meme":
            Meme.run(message, Discord);
            break;

        default:
            message.channel.send("Command not found :/");
    }
});


client.login(process.env.DISCORD_TOKEN);