import { EmbedBuilder, InteractionCollector, SlashCommandBuilder } from "discord.js";
import Schema from "../database/schema";
import { MessageType } from "../types/message";

export = {
    data: new SlashCommandBuilder()
        .setName("security")
        .setDescription("Sends the total number of attacks blocked"),
    async execute(interaction: any) {
        await Schema.countDocuments({}, (err, count: number) => {
            if (err) console.log(err);
            else {
                const msg = new EmbedBuilder()
                    .setColor("#c7651a")
                    .setTitle("Total Attacks Blocked")
                    .setURL("https://github.com/ctnkaan/Postman-Student-Helper")
                    .setDescription(count.toString())
                    .setTimestamp();

                interaction.reply({ embeds: [msg] });
            }
        });
    }
};
