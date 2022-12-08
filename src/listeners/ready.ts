import mongoose from "mongoose";

export = {
    async execute(bot: any) {
        if (!bot.user) return;        
        
        await mongoose.connect(process.env.MONGO_URI!, {
            keepAlive: true
        });

        bot.user.setActivity(`Prevented over 900+ phishing attacks!`);

        console.log(`I am ready! Logged in as ${bot.user.tag}`);
    }
};
