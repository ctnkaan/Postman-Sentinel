//<> with ❤️ by Postman Student Leaders

import Discord from "discord.js";
import mongoose from "mongoose";

//commands
import ScamDetector from "./commands/scamLinkDetector";
import Programs from "./commands/programs";
import Translate from "./commands/translate";
import Help from "./commands/help";
import Meme from "./commands/meme";
import GenderNeutralTerms from "./commands/GenderNeutralTerms";
import TotalAttacksBlocked from "./commands/totalAttacksBlocked";

import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client();

//Prefix
const prefix = "!p";

client.on("ready", async () => {
    if (!client.user) return; // to appease typescript. In reality, this will never happen
    await mongoose.connect(process.env.MONGO_URI!, {
        keepAlive: true
    });

    console.log(`I am ready! Logged in as ${client.user.tag}`);
    client.user.setActivity(`${prefix} help`);
});

client.on("message", (message: any) => {
    //Ignore bot messages
    if (message.author.bot) return;

    //Runs for every message
    ScamDetector.run(message);
    GenderNeutralTerms.run(message, Discord);

    //If the message does not start with the prefix return
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

        case "security":
            TotalAttacksBlocked.run(message, Discord);
            break;

        default:
            message.channel.send("Command not found :/");
    }
});

client.login(process.env.DISCORD_TOKEN);
