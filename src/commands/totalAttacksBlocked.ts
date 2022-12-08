import { EmbedBuilder, InteractionCollector, SlashCommandBuilder } from "discord.js";
import Schema from "../database/schema";
import { MessageType } from "../types/message";

export = {
    data: new SlashCommandBuilder()
        .setName("security")
        .setDescription("Sends the total number of attacks blocked"),
    async execute(interaction: any) {

        //count the number of messages in mongoDb database
        const sum = await Schema.countDocuments({});
        

        let msg = new EmbedBuilder();

        msg.setColor("#c7651a")
            .setTitle("Total attacks blocked")
            .setDescription(`Total attacks blocked: ${sum}`)
            .setTimestamp();



        await interaction.reply({ embeds: [msg] });
    }
};
