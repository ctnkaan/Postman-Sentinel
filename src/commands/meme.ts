import { MessageEmbed } from "discord.js";
import { meme } from "memejs";
import { MessageType } from "../types/message";

interface dataType {
    title: string;
    url: string;
    author: string;
    subreddit: string;
    created: string;
    created_utc: string;
}

export = {
    name: "meme",
    description: "Generates a meme",
    callback(message: MessageType, args: string) {
        meme("programmerhumor")
            .then((data: dataType) => {
                const msg = new MessageEmbed()
                    .setColor("#c7651a")
                    .setTitle(data.title)
                    .setImage(data.url)
                    .setTimestamp();

                message.channel.send({ embeds: [msg] });
            }) // Get the JSON output
            .catch((e) => {
                console.log(e);
                meme("programmerhumor")
                    .then((data) => {
                        const msg = new MessageEmbed()
                            .setColor("#c7651a")
                            .setTitle(data.title)
                            .setImage(data.url)
                            .setTimestamp();

                        message.channel.send({ embeds: [msg] });
                    })
                    .catch((e) =>
                        message.channel.send(
                            "Sorry I could not find any memes. Would you like to try again?"
                        )
                    );
            }); // Handle any errors
    }
};
