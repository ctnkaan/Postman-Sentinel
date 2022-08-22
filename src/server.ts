//<> with ❤️ by Çetin Kaan Taşkıngenç & Claire Froelich

import { Client, GatewayIntentBits, Partials } from "discord.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import config from "./config";

//events
import Ready from "./events/ready";
import CommandMap from "./events/commandMap"

//types
import { MessageType } from "./types/message";

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

let commands = new Map();
let silentCommands = new Map();

//When the bot is connected
bot.on("ready", async () => {
  [commands, silentCommands] = CommandMap.execute(commands, silentCommands);
  Ready.execute(bot, config.prefix);
});

//When there is a message in server
bot.on("messageCreate", async (message: MessageType) => {

    //Ignore bot messages
    if (message.author.bot) return;

    //Runs for every message
    silentCommands.get("scam detector").callback(message);
    silentCommands.get("gnt detector").callback(message);

    //If the message does not start with the prefix return
    if (!message.content.startsWith(config.prefix)) return;

    //get the message content without the prefix
    const args: string[] = message.content
        .slice(config.prefix.length)
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
        message.channel.send(`Command not found! Type ${config.prefix} help to see all commands`);
});

bot.login(process.env.DISCORD_TOKEN);
