import { isSuspiciousLink } from "../util/isSuspiciousLink";
import Schema from "../database/schema";
import Sanitize from "mongo-sanitize";
import { bannedWords } from "../config.json";
import {bannedWordNotification, suspicousLinkNotification} from "../util/notifications.json"

const skipAdminPerms = (message: any): boolean => {
        //if message author has admin perms, return
        try {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                console.log("Admin perms, skipping...");
                return true;
            }
        }
        catch (err) {
            console.log("No admin perms, checking for scam links...");
            return false;
        }

        return false;
}

const checkForBannedWords = (message: any): boolean => {
    //search spam word in message.content
    for (let word of bannedWords) {
        if (message.content.toLowerCase().includes(word)) {
            return true;
        }
    }

    return false;
}

const checkTheExtention = (link: string) => {
    //get the last 3 characters of the link
    const last3 = link.substring(link.length - 4);

    if (last3 == ".exe" || last3 == ".zip" || last3 == ".rar")
        return true;

    return false;
}

const checkDiscordLink = (link: string) => {
    if (link.toLowerCase().includes("discord"))
        return true;

    return false;
}

const saveToDatabase = (message: any) => {
    try {
        //NoSQL injection protection
        const cleanMsg = Sanitize(message.content);
        const cleanAuthor = Sanitize(message.author.username);
        const cleanAuthorID = Sanitize(message.author.id);

        setTimeout(async () => {
            await new Schema({
                id: cleanAuthorID , //id of the author
                username: cleanAuthor, //username of the author
                message: cleanMsg //scam message
            }).save();
        }, 1000);
    } catch (error) {
        console.log(error);
    }
}

export = {
    name: "scamLinkDetector",
    description: "Detects scam and phising links",
    execute: (message: any) => {
        let deleted: boolean = false;
        
        //Check for admin perms
        const hasAdminPerms = skipAdminPerms(message);
        if (hasAdminPerms) {
            return;
        }

        //Check for banned words
        const hasBannedWord = checkForBannedWords(message);

        if (hasBannedWord) {
            message.author.send(bannedWordNotification);
            message.delete();
            deleted = true;
        } else {
            /** Check for suspicious link in message */
            const links = message.content.match(/(https?:\/\/\S+)\b/g);
            
            if (links) {
                if (links && links.length) {
                    const suspiciousLinks: string[] = [];
                    
                    links.forEach((link) => {
                        const isSus = isSuspiciousLink(link);
                        const bannedFileExtention = checkTheExtention(link);
                        const isDiscordLink = checkDiscordLink(link);

                        if (isSus || bannedFileExtention || isDiscordLink) {
                            suspiciousLinks.push(link);
                        }

                    });

                    if (suspiciousLinks.length) {
                        console.log(
                            `WARNING: Suspicious link(s) from user ${message.author.username} (ID: ${message.author.id}) detected and deleted: `,
                            suspiciousLinks
                        );

                        message.author.send(suspicousLinkNotification);
                        message.delete();
                        deleted = true;
                    }
                }
            }
        }

        //If the message is marked as scam link, add it to the database
        if (deleted) {
            saveToDatabase(message);
        }

    }
};
