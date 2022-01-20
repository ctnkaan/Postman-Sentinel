import Programs from "./programs";
import Translate from "./translate";
import Meme from "./meme";
import Security from "./totalAttacksBlocked";
import { MessageType } from "../types/message";
import { MessageEmbed } from "discord.js";

export = {
    name: "help",
    description: "Displays all commands",
    callback(message: MessageType, args: string) {
        const msg = new MessageEmbed()
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
                    name: "!p help",
                    value: "Displays all commands"
                }
            )
            .setTimestamp();

        message.channel.send({ embeds: [msg] });
    }
};
