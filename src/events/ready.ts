import mongoose from "mongoose";

export = {
    async execute(bot: any, prefix: string) {
        if (!bot.user) return;


        console.log(`I am ready! Logged in as ${bot.user.tag}`);

        bot.user.setActivity(`${prefix} help`);
    }
};
