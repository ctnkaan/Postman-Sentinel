import mongoose from "mongoose";

export = {
    async execute(bot: any) {
        if (!bot.user) return;        

        console.log(`I am ready! Logged in as ${bot.user.tag}`);

        bot.user.setActivity(`Prevented over 900+ phishing attacks!`);
    }

    
};