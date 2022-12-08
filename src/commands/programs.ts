import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { MessageType } from "../types/message";

export = {
    data: new SlashCommandBuilder()
        .setName("programs")
        .setDescription("Displays the Postman Student Community Programs"),
    execute(interaction: any) {
        const msg = new EmbedBuilder()
            .setColor("#c7651a")
            .setTitle("Postman Student Community")
            .setURL("https://www.postman.com/company/student-program/")
            .setDescription(
                "Discover our programs designed to promote API literacy amongst students and educators.."
            )
            .addFields(
                {
                    name: "Student Expert Program",
                    value: "https://www.postman.com/company/student-program/#student-expert-program"
                },
                {
                    name: "Student Leader Program",
                    value: "https://www.postman.com/company/student-program/#student-leader-program"
                },
                {
                    name: "Classroom Program",
                    value: "https://www.postman.com/company/student-program/#postman-classroom-program"
                }
            )
            .setTimestamp();

        interaction.reply({ embeds: [msg] });
    }
};
