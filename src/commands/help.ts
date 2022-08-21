import Programs from "./programs";
import Translate from "./translate";
import Meme from "./meme";
import Security from "./totalAttacksBlocked";
import ProjectIdeas from "./projectIdeas";
import { MessageType } from "../types/message";
import { EmbedBuilder } from "discord.js";
import Pets from "./pets";

export = {
    name: "help",
    description: "Displays all commands",
    callback(message: MessageType, args: string) {
        const msg = new EmbedBuilder()
            .setColor("#c7651a")
            .setTitle("Commands")
            .setURL("https://github.com/ctnkaan/Postman-Student-Helper")
            .addFields(
                {
                    name: "!p " + Programs.name,
                    value: Programs.description
                },
                {
                    name: "!p " + Translate.name + " <text>",
                    value: Translate.description
                },
                {
                    name: "!p " + Meme.name,
                    value: Meme.description
                },
                {
                    name: "!p " + Security.name,
                    value: Security.description
                },
                {
                    name: "!p " + ProjectIdeas.name,
                    value: ProjectIdeas.description
                },
                {
                    name: "!p " + Pets.name,
                    value: Pets.description
                },
                {
                    name: "!p help",
                    value: "Displays all commands"
                }
            )
            .setTimestamp();

        message.channel.send({ embeds: [msg] });
    }
};
