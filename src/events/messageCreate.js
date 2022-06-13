//const {client} = require('../index');

const disableOwnerDM = true;
const ownerID = "240840819555172352";

module.exports = {
    name: "messageCreate",
    async execute(message){       
        if(message.inGuild() == true) return; // excluding non DMs
        if(message.author.bot == true) return; //excluding bot sending DMs
        if(message.author.id == ownerID && disableOwnerDM == true) return; //do not respond to my messages
        const messageOrigin = message.author.username;

        const owner = await mainServer.members.cache.get(ownerID);

        owner.send(`Message by: ${messageOrigin}, message: ${message.content}`);        
        console.log(`Message by: ${messageOrigin}, message: ${message.content}`);
    }
}