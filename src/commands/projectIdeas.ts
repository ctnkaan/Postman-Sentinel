import Project from '../projectIdeas.json';
import { MessageType } from "../types/message";
import { MessageEmbed } from "discord.js";

export = {
    name: "project Ideas",
    description: "Displays ideas for your next project",
    callback(message: MessageType, args: string) {

        const randomValue = Math.floor(Math.random() * Project.length);
        const projectName = Project[randomValue].name;
        const projectDescription = Project[randomValue].description;
        const projectRequirements = Project[randomValue].requirements.toString();

        const msg = new MessageEmbed()
            .setColor("#c7651a")
            .setTitle(projectName)
            .addFields(
                {
                    name: projectDescription,
                    value: "Requirements: \n\n" +projectRequirements
                },
            )
            .setTimestamp();

        message.channel.send({ embeds: [msg] });
    }
};
