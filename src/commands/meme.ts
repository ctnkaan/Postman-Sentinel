const { meme } = require('memejs');

module.exports = {
    name: "meme",
    description: "Generates a meme",
    run(message :any) {

        meme('ProgrammerHumor', function(err: any, data: { title: String | null; url: String; }) {

            if (err) 
                return message.channel.send("I had an error :/");
            
            if (data.title != null)
                message.channel.send(data.title);
            message.channel.send(data.url);
        });
    }
}