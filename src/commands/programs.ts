export = {
  name: "programs",
  description: "List all programs",
  run(message: any, Discord: any) {
    const msg = new Discord.MessageEmbed()
      .setColor("#c7651a")
      .setTitle("Postman Student Community")
      .setURL("https://www.postman.com/company/student-program/")
      .setAuthor(
        "Postman Student Helper",
        "https://i.imgur.com/ElCDWZb.png",
        "https://github.com/ctnkaan/Postman-Student-Helper"
      )
      .setDescription(
        "Discover our programs designed to promote API literacy amongst students and educators.."
      )
      .addFields(
        {
          name: "Student Expert Program",
          value:
            "https://www.postman.com/company/student-program/#student-expert-program",
        },
        {
          name: "Student Leader Program",
          value:
            "https://www.postman.com/company/student-program/#student-leader-program",
        },
        {
          name: "Classroom Program",
          value:
            "https://www.postman.com/company/student-program/#postman-classroom-program",
        }
      )
      .setTimestamp()
      .setFooter(
        'type "!p help" for more info!',
        "https://i.imgur.com/ElCDWZb.png"
      );
    message.channel.send(msg);
  },
};
