//<> with ❤️ by Postman Student Leaders

import dotenv from 'dotenv';
dotenv.config();

const { Client, Intents } = require("discord.js");
const Bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

Bot.on("ready", () => {
  console.log("I am ready!");
});

Bot.on("messageCreate", (message: { content: string; channel: { send: (arg0: string) => void; }; }) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});


Bot.login(process.env.DISCORD_TOKEN);