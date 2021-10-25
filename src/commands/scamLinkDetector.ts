module.exports = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    run: (msg: any) => {
        var suspicious_words:string[];
        suspicious_words = ["nitro","i leave from cs:go","grafiby.link"];
        if (suspicious_words.indexOf(msg.content.toLowerCase()) !== -1) {
            msg.delete();
            msg.channel.send(`A suspicious message has been deleted!`);
        }
    }
}
