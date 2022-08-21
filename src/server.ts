//<> with ❤️ by Çetin Kaan Taşkıngenç & Claire Froelich

import { Client, GatewayIntentBits, Partials } from "discord.js";
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
import Pets from "./commands/pets";

//types
import { MessageType } from "./types/message";
import ProjectIdeas from "./commands/projectIdeas";

const bot = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
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
commands.set("project", ProjectIdeas);
commands.set("pets", Pets);

//When the bot is connected
bot.on("ready", async () => {
    if (!bot.user) return; // to appease typescript. In reality, this will never happen
    await mongoose.connect(process.env.MONGO_URI!, {
        keepAlive: true
    });

    console.log(`I am ready! Logged in as ${bot.user.tag}`);
    bot.user.setActivity(`${prefix} help`);
});

//When there is a message in server
bot.on("messageCreate", async (message: MessageType) => {

    //Ignore bot messages
    if (message.author.bot) return;

    //Runs for every message
    ScamDetector.callback(message);
    GenderNeutralTerms.callback(message);

    //If the message does not start with the prefix return
    if (!message.content.startsWith(prefix)) return;

    //get the message content without the prefix
    const args: string[] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    //get the command
    const command: string = args.shift()!.toLowerCase();

    //Check if the command exists in the hashmap. It returns undefined if it doesn't exist
    const currCommand = commands.get(command);
    

    //If the currCommand is not undefined,
    if (currCommand) 
        currCommand.callback(message, args);
    else
        message.channel.send(`Command not found! Type ${prefix} help to see all commands`);
});

bot.login(process.env.DISCORD_TOKEN);
