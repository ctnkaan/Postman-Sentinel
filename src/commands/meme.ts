import { meme } from "memejs";

export = {
  name: "meme",
  description: "Generates a meme",
  run(message: any, Discord: any) {
    meme(
      "ProgrammerHumor",
      function (err: any, data: { title: String | null; url: String }) {
        if (err) return message.channel.send("I had an error :/");

        if (data.title == null) data.title = "No title";

        const msg = new Discord.MessageEmbed()
          .setColor("#c7651a")
          .setTitle(data.title)
          .setImage(data.url)
          .setTimestamp()
          .setFooter(
            'type "!p help" for more info!',
            "https://i.imgur.com/ElCDWZb.png"
          );
        message.channel.send(msg);
      }
    );
  },
};
