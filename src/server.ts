//<> with ❤️ by Çetin Kaan Taşkıngenç & Claire Froelich

import { Client, GatewayIntentBits, Partials, Events, Collection } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import config from "./config.json";

//utils
import path from "path";
import fs from "fs";

//events
import Ready from "./listeners/ready";

//types
import { MessageType } from "./types/message";
import scamLinkDetector from "./listeners/scamLinkDetector";

const bot = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel],
}) as any;

bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
        console.log(`--- [INFO] Loaded command ${command.data.name} from ${filePath}. ---`)
	} else {
		console.log(`--- [WARNING] The command at ${filePath} is missing a required "data" or "execute" property. ---`);
	}
}

//When the bot is connected
bot.once(Events.ClientReady, () => {
    Ready.execute(bot);
});

bot.on(Events.InteractionCreate, async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;
	console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

bot.on(Events.MessageCreate, async (message: any) => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	scamLinkDetector.execute(message);
});


bot.login(process.env.DISCORD_TOKEN);
