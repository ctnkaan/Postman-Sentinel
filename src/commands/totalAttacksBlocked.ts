import Schema from "../database/schema";

export = {
    name: "security",
    description: "Displays the total number of attacks blocked",
    run(message: any, Discord: any) {
        
        Schema.countDocuments({}, function(err, count) {
            if (err) { console.log(err)}
            else {
                const msg = new Discord.MessageEmbed()
                .setColor("#c7651a")
                .setTitle("Total Attacks Blocked")
                .setURL("https://github.com/ctnkaan/Postman-Student-Helper")
                .setAuthor(
                    "Postman Student Helper",
                    "https://i.imgur.com/ElCDWZb.png",
                    "https://github.com/ctnkaan/Postman-Student-Helper"
                )
                .setDescription(count)
                .setTimestamp()
                .setFooter(
                    'type "!p help" for more info!',
                    "https://i.imgur.com/ElCDWZb.png"
                );

                message.channel.send(msg);
            }

        })



    }
};
