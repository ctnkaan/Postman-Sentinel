const scams = {
    csgo_scam: 'hello! i leave from cs:go and give all my inventory, the first three who send a trade',
    discord_scam1: 'Yo, friend gave me a referral link to get Discord nitro for free',
    discord_scam2: "Discord Nitro for Free - Steam Store",
    discord_scam3: "Hey i still got a spare nitro code from the epic games promotion, you can have it"
}

module.exports = {
    name: "scamLinkDetector",
    run: (message: any) => {
        
        if (
            message.content.toLowerCase().substring(0,86) === scams.csgo_scam.toLowerCase() ||
            message.content.toLowerCase().substring(0,65) === scams.discord_scam1.toLowerCase() ||
            message.content.toLowerCase().substring(0,37) === scams.discord_scam2.toLowerCase() ||
            message.content.toLowerCase().substring(0,82) === scams.discord_scam3.toLowerCase()
        ) {
            message.delete();
            message.channel.send(`A suspicious message has been deleted!`);
        }
    }
}