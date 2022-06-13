const {musicBotChannelID} = require('./config.json');
const {NoSubscriberBehavior, createAudioPlayer } = require('@discordjs/voice');
const {guildID} = require('./config.json');


module.exports = {
    name: 'globals',
    async execute(client){
        global.MUSICBOT_channel = client.channels.cache.get(musicBotChannelID);
        global.serverQueue = [];
        global.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,              
            },   
        });
        global.mainServer = client.guilds.cache.get(guildID);
    }
}

