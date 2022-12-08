import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { meme } from "memejs";
import { MessageType } from "../types/message";
import { MemeType } from "../types/meme";

export = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Sends a random meme from r/programmerhumor'),
    async execute(interaction: any) {
        await meme("programmerhumor")
            .then((data: MemeType) => {
                const msg = new EmbedBuilder()
                    .setColor("#c7651a")
                    .setTitle(data.title)
                    .setImage(data.url)
                    .setTimestamp();

                interaction.reply({ embeds: [msg] });
            }) // Get the JSON output
            .catch(async (e) => {
                console.log(e);
                await meme("programmerhumor")
                    .then((data) => {
                        const msg = new EmbedBuilder()
                            .setColor("#c7651a")
                            .setTitle(data.title)
                            .setImage(data.url)
                            .setTimestamp();

                        interaction.reply({ embeds: [msg] });
                    })
                    .catch(async (e) =>
                        await interaction.reply(
                            "Sorry I could not find any memes. Would you like to try again?"
                        )
                    );
            }); // Handle any errors
    }
};
