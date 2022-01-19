import { translate } from "bing-translate-api";
import { MessageEmbed } from "discord.js";

export = {
    name: "translate",
    description: "Translate a message from another language to English",
    async callback(message: any, args: string[]) {
        if (message.author.bot) return;

        const srcStr = args.join(" ");

        translate(srcStr, null, "en", true)
            .then((res: { translation: string }) => {
                if (res.translation == srcStr) {
                    const msg = new MessageEmbed()
                        .setColor("#c7651a")
                        .setTitle("Translation Error")
                        .setDescription(
                            "The text is either already in English or I can't understand what language it is\nI can't Understand languages such as Hindi or Japanese in Latin Alphabet."
                        )
                        .setTimestamp()
                        .setFooter(
                            'type "!p help" for more info!',
                            "https://i.imgur.com/ElCDWZb.png"
                        );
                    message.channel.send({ embeds: [msg] });
                } else {
                    const msg = new MessageEmbed()
                        .setColor("#c7651a")
                        .setTitle("Translation")
                        .setDescription(res.translation)
                        .setTimestamp()
                        .setFooter(
                            'type "!p help" for more info!',
                            "https://i.imgur.com/ElCDWZb.png"
                        );
                    message.channel.send({ embeds: [msg] });
                }
            })
            .catch((err: any) => {
                const msg = new MessageEmbed()
                    .setColor("#c7651a")
                    .setTitle("Translation Error")
                    .setDescription(
                        "Please provide a non English text to translate"
                    )
                    .setTimestamp()
                    .setFooter(
                        'type "!p help" for more info!',
                        "https://i.imgur.com/ElCDWZb.png"
                    );

                console.error(err);
                message.channel.send({ embeds: [msg] });
            });
    }
};
