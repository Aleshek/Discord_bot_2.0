const {musicBotChannelID} = require('./config.json');
const {NoSubscriberBehavior, createAudioPlayer } = require('@discordjs/voice');


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
    }
}

