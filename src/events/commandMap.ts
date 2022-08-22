//commands
import ScamDetector from "../commands/scamLinkDetector";
import Programs from "../commands/programs";
import Translate from "../commands/translate";
import Help from "../commands/help";
import Meme from "../commands/meme";
import GenderNeutralTerms from "../commands/GenderNeutralTerms";
import TotalAttacksBlocked from "../commands/totalAttacksBlocked";
import Pets from "../commands/pets";
import ProjectIdeas from "../commands/projectIdeas";

export = {
  execute(commands: any, siletCommands: any) {

    commands.set("programs", Programs);
    commands.set("meme", Meme);
    commands.set("translate", Translate);
    commands.set("help", Help);
    commands.set("security", TotalAttacksBlocked);
    commands.set("project", ProjectIdeas);
    commands.set("pets", Pets);

    siletCommands.set("scam detector", ScamDetector);
    siletCommands.set("gnt detector", GenderNeutralTerms);

    return [commands, siletCommands];
  }
}
