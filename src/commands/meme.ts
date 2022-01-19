import { MessageEmbed } from "discord.js";
import { meme } from "memejs";

export = {
    name: "meme",
    description: "Generates a meme",
    callback(message: any, args: string) {
        
        meme('programmerhumor')// Use meme('subredditname') to filter subreddits
            .then(data => {
                console.log(data);
                const msg = new MessageEmbed()
                .setColor("#c7651a")
                .setTitle(data.title)
                .setImage(data.url)
                .setTimestamp()
                .setFooter(
                    'type "!p help" for more info!',
                    "https://i.imgur.com/ElCDWZb.png"
                );
        
                message.channel.send({embeds: [msg]});
            }) // Get the JSON output
            .catch(e => console.log(e)); // Handle any errors  
    }
}
