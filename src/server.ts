//<> with ❤️ by Postman Student Leaders

import Discord from "discord.js";

//commands
import ScamDetector from "./commands/scamLinkDetector";
import Programs from "./commands/programs";
import Translate from "./commands/translate";
import Help from "./commands/help";
import Meme from "./commands/meme";
import GenderNeutralTerms from "./commands/GenderNeutralTerms";

import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client();

//Prefix
const prefix = "!p";

client.on("ready", () => {
  console.log("I am ready!");
  client.user && client.user.setActivity("!p help");
});

client.on("message", (message: any) => {
  if (message.author.bot) return;

  ScamDetector.run(message);
  GenderNeutralTerms.run(message, Discord);

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
