import { isSuspiciousLink } from "../util/isSuspiciousLink";
import Schema from "../database/schema";

export = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    run: (msg: any) => {
        const banned_words: string[] = ["nitro", "i leave from cs:go"];
        let isScamLink: boolean = false;

        //search spam word in msg.content
        for (let banned_word of banned_words) {
            if (msg.content.toLowerCase().includes(banned_word)) {
                isScamLink = true;
                break;
            }
        }

        if (isScamLink) {
            msg.author
                .send(
                    "Word nitro is banned due to increase in scams. If you see multiple of these messages your account is probably infected."
                )
                .catch(console.error);
            msg.delete().catch(console.error);
        } else {
            /** Check for suspicious link in message */
            const links = msg.content.match(/(https?:\/\/\S+)\b/g);
            if (links) {
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
                        msg.delete().catch(console.error);
                        isScamLink = true;
                    }
                }
            }
        }

        if (isScamLink) {
            try {
                setTimeout(async () => {
                    await new Schema({
                        id_username:
                            msg.author.id + " - " + msg.author.username,
                        message: msg.content
                    }).save();
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
