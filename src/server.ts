//<> with ❤️ by Çetin Kaan Taşkıngenç & Claire Froelich

import { Client, GatewayIntentBits, Partials } from "discord.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import config from "./config";

//events
import Ready from "./events/ready";
import CommandMap from "./events/commandMap";
import MessageCreate from "./events/messageCreate";

//types
import { MessageType } from "./types/message";

const bot = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
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
    MessageCreate.execute(message, commands, silentCommands, config.prefix);
});

bot.login(process.env.DISCORD_TOKEN);
