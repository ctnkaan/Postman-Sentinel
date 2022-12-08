import Project from "../projectIdeas.json";
import { MessageType } from "../types/message";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export = {
    data: new SlashCommandBuilder()
        .setName("project")
        .setDescription("Sends a random project idea"),
    execute(interaction: any) {
        const randomValue = Math.floor(Math.random() * Project.length);
        const projectName = Project[randomValue].name;
        const projectDescription = Project[randomValue].description;
        const projectRequirements =
            Project[randomValue].requirements.toString();

        const msg = new EmbedBuilder()
            .setColor("#c7651a")
            .setTitle(projectName)
            .addFields({
                name: projectDescription,
                value: "\n\n" + projectRequirements
            })
            .setTimestamp();

        interaction.reply({ embeds: [msg] });
    }
};
