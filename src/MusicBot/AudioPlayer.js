const { NoSubscriberBehavior, createAudioPlayer } = require('@discordjs/voice');

let player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,

    },
});

module.exports = {
    player: player
}
