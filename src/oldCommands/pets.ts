import { EmbedBuilder } from "discord.js";
import { meme } from "memejs";
import { MessageType } from "../types/message";
import { MemeType } from "../types/meme";

export = {
    name: "pets",
    description: "Generates a cute pet image",
    callback(message: MessageType, args: string) {
        meme("cats")
            .then((data: MemeType) => {
                const msg = new EmbedBuilder()
                    .setColor("#c7651a")
                    .setTitle(data.title)
                    .setImage(data.url)
                    .setTimestamp();

                message.channel.send({ embeds: [msg] });
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

                        message.channel.send({ embeds: [msg] });
                    })
                    .catch((e) =>
                        message.channel.send(
                            "Sorry I could not find any pictures. Would you like to try again?"
                        )
                    );
            }); // Handle any errors
    }
};
