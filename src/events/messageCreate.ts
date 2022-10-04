import { MessageType } from "../types/message";

export = {
    execute(message: MessageType, commands, silentCommands, prefix) {
        //Ignore bot messages
        if (message.author.bot) return;

        //Runs for every message
        silentCommands.get("scam detector").callback(message);
        silentCommands.get("gnt detector").callback(message);

        //If the message does not start with the prefix return
        if (!message.content.startsWith(prefix)) return;

        //get the message content without the prefix
        const args: string[] = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        //Check if the command exists in the hashmap. It returns undefined if it doesn't exist
        const inputedCommand = commands.get(args.shift()!.toLowerCase());

        //If the currCommand is not undefined,
        if (inputedCommand) inputedCommand.callback(message, args);
        else if (inputedCommand === null || inputedCommand === undefined)
            message.channel.send(
                `Command not found! Type ${prefix} help to see all commands`
            );
    }
};
