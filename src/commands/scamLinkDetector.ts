import { isSuspiciousLink } from "../util/isSuspiciousLink";

export = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    run: (msg: any) => {
        /** Check for nitro */
        var does_msg_include_spam:boolean = false;
        let spam_words: string[] = ["nitro","i leave from cs:go"];
        
        for(let spam_word of spam_words) {
            if(!does_msg_include_spam && msg.content.toLowerCase().includes(spam_word)) {
                does_msg_include_spam = true
            }
        }
        
        if (does_msg_include_spam) {
            msg.author
                .send(
                    "Word nitro is banned due to increase in scams. If you see multiple of these messages your account is probably infected."
                )
                .catch(console.error);
            msg.delete();
        } else {
            /** Check for suspicious link in message */
            const links = msg.content.match(/(https?:\/\/\S+)\b/g);
            if (links) {
                console.log(
                    `INFO: Links detected in message from ${msg.author.username}} (ID: ${msg.author.id}): `,
                    links
                );
                if (links && links.length) {
                    const suspiciousLinks: string[] = [];
                    links.forEach((l) => {
                        const isSus = isSuspiciousLink(l);
                        if (isSus) {
                            suspiciousLinks.push(l);
                        }
                    });
                    if (suspiciousLinks.length) {
                        console.log(
                            `WARNING: Suspicious link(s) from user ${msg.author.username} (ID: ${msg.author.id}) detected and deleted: `,
                            suspiciousLinks
                        );
                        // Make links unclickable
                        const safeLinks = suspiciousLinks.map((l) => {
                            const i = l.indexOf("/");
                            return l.slice(0, i) + " " + l.slice(i);
                        });
                        const dmMsg = `---------------------\n🚨WARNING🚨: One or more suspicious looking links associated with spam was sent from your account in the Postman Student Community Server\n\nLinks you sent (DO NOT VISIT!): ${safeLinks.join(
                            ", "
                        )} \n\nIf you didn't intentionally send these links, there is a change your account was hacked and is sending out malicious messages. In this case, **please change your password and enable two-factor authentication on your Discord account**.\n\nIf you do not take remedial action we will need to ban your account from the Postman Student Server. Contact a Postmanaut if you have any questions or you believe this was an error!`;

                        msg.author.send(dmMsg).catch(console.error);
                        msg.delete();
                    }
                }
            }
        }
    }
};
