import { distance } from "fastest-levenshtein";

/** Most spam links try to typosquat 'discord' to trick users into thinking the link is safe (ex: "discorde")*/
const TYPOSQAUT_TARGET = "discord";

function isSuspiciousLink(link, threshold = 3) {
    // get base domain
    const matches = link.match(/^https?:\/\/(\S+?)\./);
    if (!matches) return;
    const base = matches[1];
    // check levenshtein distance of domain to "discord"
    const d = distance(TYPOSQAUT_TARGET, base);
    // if distance is > 0 and < threshold, base is typosquating. Call foul
    if (d > 0 && d <= threshold) {
        return true;
    }
    return false;
}

export { isSuspiciousLink };
