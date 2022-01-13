export = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    run: (msg: any) => {
        /** Check for nitro */
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
        } else {
            /** Check for suspicious link in message */
            // test change
            const links = msg.content.match(/(https?:\/\/\S+)\b/g);
            if (links && links.length) {
                // TODO: check link
                const hasSuspiciousLink = false;
                if (hasSuspiciousLink) {
                    console.log("Suspicious link detected and deleted:");
                }
            }
        }
    }
};
