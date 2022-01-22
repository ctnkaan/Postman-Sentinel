//<> with ❤️ by Çetin Kaan Taşkıngenç & Postman Student Leaders

import { Client } from "discord.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//commands
import ScamDetector from "./commands/scamLinkDetector";
import Programs from "./commands/programs";
import Translate from "./commands/translate";
import Help from "./commands/help";
import Meme from "./commands/meme";
import GenderNeutralTerms from "./commands/GenderNeutralTerms";
import TotalAttacksBlocked from "./commands/totalAttacksBlocked";

//types
import { MessageType } from "./types/message";

const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILDS"
    ]
});

//Prefix
const prefix = "!p";

//create hashmap for imported commands files
const commands = new Map();

commands.set("programs", Programs);
commands.set("meme", Meme);
commands.set("translate", Translate);
commands.set("help", Help);
commands.set("security", TotalAttacksBlocked);

//When the bot is connected
client.on("ready", async () => {
    if (!client.user) return; // to appease typescript. In reality, this will never happen
    await mongoose.connect(process.env.MONGO_URI!, {
        keepAlive: true
    });

    console.log(`I am ready! Logged in as ${client.user.tag}`);
    client.user.setActivity(`${prefix} help`);
});

//When there is a message in server
client.on("messageCreate", (message: MessageType) => {
    //Ignore bot messages
    if (message.author.bot) return;

    //Runs for every message
    ScamDetector.callback(message);
    GenderNeutralTerms.callback(message);

    //If the message does not start with the prefix return
    if (!message.content.startsWith(prefix)) return;

    const args: string[] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command: string = args.shift()!.toLowerCase();

    //Check if the command exists in the hashmap. It returns undefined if it doesn't exist
    const currCommand = commands.get(command);

    //If the currCommand is not undefined,
    if (currCommand) currCommand.callback(message, args);
    else
        message.channel.send(
            `Command not found! Type ${prefix} help to see all commands`
        );
});

client.login(process.env.DISCORD_TOKEN);
