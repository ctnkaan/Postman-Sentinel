//<> with ❤️ by Postman Student Leaders

import dotenv from 'dotenv';
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();


//commands
const ScamDetector = require('./commands/scamLinkDetector');
const Programs = require('./commands/programs');
const Translate = require('./commands/translate');
const Help = require('./commands/help');

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

    console.log(command);
    
    switch (command) {
        case "programs":
            Programs.run(message, Discord);
            break;
        
        case "translate":
            //Translate.run(message, Discord, args);
            message.channel.send("Translate command is under maintenance");
            break;

        case "help":
            Help.run(message, Discord);
            break;

        default:
            message.channel.send("Command not found :/");
    }
});


client.login(process.env.DISCORD_TOKEN);