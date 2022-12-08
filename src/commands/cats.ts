import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { meme } from "memejs";
import { MemeType } from "../types/meme";

export = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Sends a random cat picture"),
    async execute (interaction: any) {
        meme("cats")
            .then((data: MemeType) => {
                const msg = new EmbedBuilder()
                    .setColor("#c7651a")
                    .setTitle(data.title)
                    .setImage(data.url)
                    .setTimestamp();

                interaction.reply({ embeds: [msg] });
            }) // Get the JSON output
            .catch((e) => {
                console.log(e);
                meme("cats")
                    .then((data) => {
                        const msg = new EmbedBuilder()
                            .setColor("#c7651a")
                            .setTitle(data.title)
                            .setImage(data.url)
                            .setTimestamp();

                        interaction.channel.send({ embeds: [msg] });
                    })
                    .catch((e) =>
                        interaction.reply(
                            "Sorry I could not find any pictures. Would you like to try again?"
                        )
                    );
            }); // Handle any errors
    }
};
