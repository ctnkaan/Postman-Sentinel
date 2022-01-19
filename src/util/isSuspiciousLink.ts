import { distance } from "fastest-levenshtein";
import config from "../config";

/** Most spam links try to typosquat 'discord' to trick users into thinking the link is safe (ex: "discorde")*/
const TYPOSQUAT_TARGET = "discord";

function isSuspiciousLink(link, threshold = 4) {
    // get base domain
    const matches = link.match(/^https?:\/\/(\S+?)\./);
    if (!matches) return;
    const base = matches[1];

    // expempt whitelist
    if (config.whitelist.includes(base)) return false;

    // check levenshtein distance of domain to "discord"
    const d = distance(TYPOSQUAT_TARGET, base);
    // if distance is > 0 and < threshold, base is typosquating. Call foul
    if (d > 0 && d <= threshold) {
        return true;
    }
    return false;
}

export { isSuspiciousLink };
