import { EmbedBuilder } from "discord.js";
import Schema from "../database/schema";
import { MessageType } from "../types/message";

export = {
    name: "security",
    description: "Displays the total number of attacks blocked",
    callback(message: MessageType, args: string) {
        Schema.countDocuments({}, (err, count: number) => {
            if (err) console.log(err);
            else {
                const msg = new EmbedBuilder()
                    .setColor("#c7651a")
                    .setTitle("Total Attacks Blocked")
                    .setURL("https://github.com/ctnkaan/Postman-Student-Helper")
                    .setDescription(count.toString())
                    .setTimestamp();

                message.channel.send({ embeds: [msg] });
            }
        });
    }
};
