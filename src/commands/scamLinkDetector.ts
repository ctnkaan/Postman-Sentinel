module.exports = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    run: (msg: any) => {
        
        if (
        (msg.content.toLowerCase().includes("nitro") && msg.content.toLowerCase().includes("free")) || 
         msg.content.toLowerCase().includes("i leave from cs:go")
        ) {
            msg.delete();
            msg.channel.send(`A suspicious message has been deleted!`);
        }
    }
}