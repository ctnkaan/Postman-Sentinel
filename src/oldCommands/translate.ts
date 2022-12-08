import { translate } from "bing-translate-api";
import { EmbedBuilder } from "discord.js";
import { MessageType } from "../types/message";

export = {
    name: "translate",
    description: "Translate a message from another language to English",
    async callback(message: MessageType, args: any) {
        const srcStr = args.join(" ");

        translate(srcStr, null, "en", true)
            .then((res: { translation: string }) => {
                if (res.translation == srcStr) {
                    const msg = new EmbedBuilder()
                        .setColor("#c7651a")
                        .setTitle("Translation Error")
                        .setDescription(
                            "The text is either already in English or I can't understand what language it is\n" +
                                "I can't Understand languages such as Hindi or Japanese in Latin Alphabet."
                        )
                        .setTimestamp();
                    message.channel.send({ embeds: [msg] });
                } else {
                    const msg = new EmbedBuilder()
                        .setColor("#c7651a")
                        .setTitle("Translation")
                        .setDescription(res.translation)
                        .setTimestamp();
                    message.channel.send({ embeds: [msg] });
                }
            })
            .catch((err: any) => {
                const msg = new EmbedBuilder()
                    .setColor("#c7651a")
                    .setTitle("Translation Error")
                    .setDescription(
                        "Please provide a non English text to translate"
                    )
                    .setTimestamp();

                console.error(err);
                message.channel.send({ embeds: [msg] });
            });
    }
};
