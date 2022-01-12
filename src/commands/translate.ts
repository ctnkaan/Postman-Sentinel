import { translate } from "bing-translate-api";

export = {
    name: "translate",
    description: "Translate a message from another language to English",
    async run(message: any, Discord: any, args: String) {
        if (message.author.bot) return;

        translate(args, null, "en", true)
            .then((res: { translation: string }) => {
                if (res.translation == args) {
                    const msg = new Discord.MessageEmbed()
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
                    message.channel.send(msg);
                } else {
                    const msg = new Discord.MessageEmbed()
                        .setColor("#c7651a")
                        .setTitle("Translation")
                        .setDescription(res.translation)
                        .setTimestamp()
                        .setFooter(
                            'type "!p help" for more info!',
                            "https://i.imgur.com/ElCDWZb.png"
                        );
                    message.channel.send(msg);
                }
            })
            .catch((err: any) => {
                const msg = new Discord.MessageEmbed()
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
                message.channel.send(msg);

                console.error(err);
            });
    }
};
