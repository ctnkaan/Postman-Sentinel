import { MessageEmbed } from "discord.js";

export = {
    name: "GenderNeutralTerms",
    description: "Warns users to use gender netural terms",
    callback: (message: any) => {
        const currMsg = message.content.toLowerCase().split(" ");

        if (
            currMsg.includes("guys") ||
            currMsg.includes("bro") ||
            currMsg.includes("dude")
        ) {
            const msg = new MessageEmbed()
                .setColor("#c7651a")
                .setTitle("Please Try To Use Gender Neutral Terms ☺️")
                .setURL("https://github.com/ctnkaan/Postman-Student-Helper")
                .setAuthor(
                    "Postman Student Helper",
                    "https://i.imgur.com/ElCDWZb.png",
                    "https://github.com/ctnkaan/Postman-Student-Helper"
                )
                .addFields({
                    name: "Hi there! Please try to use gender netural terms :)",
                    value: "You can use words such as 'person', 'friend', 'pal', 'folks', 'individual' insted of of words like 'guys', 'bro', 'dude', etc..."
                })
                .setTimestamp()
                .setFooter(
                    'type "!p help" for more info!',
                    "https://i.imgur.com/ElCDWZb.png"
                );

                
            message.author.send({embeds: [msg]});
        }
    }
};
