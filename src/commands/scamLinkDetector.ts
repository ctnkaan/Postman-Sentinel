import { isSuspiciousLink } from "../util/isSuspiciousLink";
import Schema from "../database/schema";
import { MessageType } from "../types/message";
import Sanitize from "mongo-sanitize";

export = {
    name: "scamLinkDetector",
    description: "Detects scam links",
    callback: (message: MessageType) => {
        const banned_words: string[] = ["nitro", "i leave from cs:go", "mediafire"];
        let isScamLink: boolean = false;

        //search spam word in message.content
        for (let banned_word of banned_words) {
            if (message.content.toLowerCase().includes(banned_word)) {
                isScamLink = true;
                break;
            }
        }

        if (isScamLink) {
            message.author.send(
                "Word nitro is banned due to increase in scams. If you see multiple of these messages your account is probably infected."
            );
            message.delete();
        } 
        
        
        
        else {
            /** Check for suspicious link in message */
            const links = message.content.match(/(https?:\/\/\S+)\b/g);
            if (links) {
                if (links && links.length) {
                    const suspiciousLinks: string[] = [];
                    links.forEach((l) => {
                        const isSus = isSuspiciousLink(l);
                        console.log(l, isSus);
                        
                        if (isSus) {
                            suspiciousLinks.push(l);
                        }
                    });
                    if (suspiciousLinks.length) {
                        console.log(
                            `WARNING: Suspicious link(s) from user ${message.author.username} (ID: ${message.author.id}) detected and deleted: `,
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

                        message.author.send(dmMsg);
                        message.delete();
                        isScamLink = true;
                    }
                }
            }
        }

        //If the message is marked as scam link, add it to the database
        if (isScamLink) {
            try {
                //NoSQL injection protection
                const cleanMsg = Sanitize(message.content);
                const cleanAuthor = Sanitize(message.author.username);
                const cleanAuthorID = Sanitize(message.author.id);

                setTimeout(async () => {
                    await new Schema({
                        id_username: cleanAuthorID + " - " + cleanAuthor,
                        message: cleanMsg
                    }).save();
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
