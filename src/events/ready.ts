export = {
  execute(bot: any, prefix: string) {
    if (!bot.user) return;
    //await mongoose.connect(process.env.MONGO_URI!, {
    //    keepAlive: true
    //});

    console.log(`I am ready! Logged in as ${bot.user.tag}`);
    
    bot.user.setActivity(`${prefix} help`);
  }
}  



