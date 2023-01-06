import { distance } from "fastest-levenshtein";
import config from "../config.json";

/** Most spam links try to typosquat 'discord' to trick users into thinking the link is safe (ex: "discorde")*/
const TYPOSQUAT_TARGET = ["discord"];
let susometer = false;

function isSuspiciousLink(link: string, threshold = 4) {
    // get base domain
    const matches = link.match(/^https?:\/\/(\S+?)\./);
    if (!matches) return;
    const base = matches[1];

    // expempt whitelist
    if (config.whitelist.includes(base)) return false;

    // check levenshtein distance of domain to all typosquat targets
    TYPOSQUAT_TARGET.forEach((element) => {
        const d = distance(element, base);
        // if distance is > 0 and < threshold, base is typosquating. Call foul
        if (d > 0 && d <= threshold) {
            susometer = true;
        }
    });

    return susometer;
}

export { isSuspiciousLink };
