import { MessageEmbed } from "discord.js";
import { MessageType } from "../types/message";

export = {
    name: "GenderNeutralTerms",
    description: "Warns users to use gender netural terms",
    callback: (message: MessageType) => {
        const currMsg = message.content.toLowerCase().split(" ");

        if (
            currMsg.includes("guys") ||
            currMsg.includes("bro") ||
            currMsg.includes("dude")
        ) {
            const msg = new MessageEmbed()
                .setColor("#c7651a")
                .setTitle("Please Try To Use Gender Neutral Terms ☺️")
                .setURL("https://github.com/ctnkaan/Postman-Student-Helper")
                .addFields({
                    name: "Hi there! Please try to use gender netural terms :)",
                    value: "You can use words such as 'person', 'friend', 'pal', 'folks', 'individual' insted of of words like 'guys', 'bro', 'dude', etc..."
                })
                .setTimestamp();

            message.author.send({ embeds: [msg] });
        }
    }
};
