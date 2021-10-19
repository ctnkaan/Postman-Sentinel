module.exports = {
    name: "scamLinkDetector",
    run: (message: any) => {
        
        if (
            (message.content.toLowerCase().includes("nitro") ||
            message.content.toLowerCase().includes("i leave from cs:go"))
        ) {
            message.delete();
            message.channel.send(`A suspicious message has been deleted!\nSorry but the word "Nitro" is banned because of the scams going on.`);
        }
    }
}