export = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    run: (msg: any) => {
        if (
            msg.content.toLowerCase().includes("nitro") ||
            msg.content.toLowerCase().includes("i leave from cs:go")
        ) {
            msg.author
                .send(
                    "Word nitro is banned due to increase in scams. If you see multiple of these messages your account is probably infected."
                )
                .catch(console.error);
            msg.delete();
        }
    }
};
