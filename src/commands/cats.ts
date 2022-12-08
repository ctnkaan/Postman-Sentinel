import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { meme } from "memejs";
import { MemeType } from "../types/meme";

export = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Sends a random cat picture"),
    async execute (interaction: any) {

        let msg = new EmbedBuilder();

        await meme("cats")
            .then((data: MemeType) => {
                msg.setColor("#c7651a")
                .setTitle(data.title)
                .setImage(data.url)
                .setTimestamp();

            }) // Get the JSON output
            .catch((e) => {
                console.log(e);
                meme("cats")
                    .then((data) => {
                        msg.setColor("#c7651a")
                            .setTitle(data.title)
                            .setImage(data.url)
                            .setTimestamp();

                    })
                    .catch((e) =>
                        msg.setColor("#c7651a")
                            .setTitle("Error")
                            .setDescription("Something went wrong")
                            .setTimestamp()
                    );
            }); // Handle any errors

        await interaction.reply({ embeds: [msg] });
    }
};
