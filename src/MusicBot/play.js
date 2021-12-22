const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, AudioPlayerStatus, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays music')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Youtube URL of a song you want to play')
                .setRequired(true)
        ),
    async execute(interaction) {
        var output = joinVC(interaction) || "TEMP MESSAGE";
        var songURL = interaction.options.getString('url');
        await createObjectAndAddToQ(songURL);
        if (serverQueue.length == 1) { //AUTOREPLY IF QUEUE IS EMPTY
            await player.removeAllListeners();

            console.log("[Music bot] - FIRST PLAY");
            let resource = createAudioResource(serverQueue[0].object);
            await player.play(resource); //PLAY 

            player.on(AudioPlayerStatus.Idle, () => { //CREATE A LISTENER
                console.log("[Music bot] - IDLE EVENT TRIGGERED!");
                serverQueue.shift();
                if (serverQueue.length == 0) {//
                    console.log('[Music bot] - Queue is empty')
                    output = "Queue is empty";
                } else {
                    var resource = createAudioResource(serverQueue[0].object);
                    console.log(serverQueue[0].title);
                    player.play(resource);
                }
            });
        }


        await interaction.reply({ content: output, ephemeral: true })
    }
}

function joinVC(interaction) {
    try {
        const channel = interaction.member?.voice.channel;
        if (!getVoiceConnection(channel.guild.id)) {
            console.log('[Music bot] - creating voice connection and joining voice channel!');
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            const subscription = connection.subscribe(player);

            connection.on('stateChange', (oldState, newState) => {
                console.log(`[Music bot] - Connection transitioned from ${oldState.status} to ${newState.status}`);
            })
        }
    } catch (e) {
        return "You have to be in a voice channel! >:c"
    }
}

async function createObjectAndAddToQ(url) {
    try {
        const songInfo = await ytdl.getInfo(url);
        const songAudio = ytdl.downloadFromInfo(songInfo, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 });
        const song = {
            title: songInfo.videoDetails.title,//getSong.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            object: songAudio,
        };
        serverQueue.push(song);
        console.log(`[Music bot] - Current server queue length: ${serverQueue.length}`);
        return "Created a song resource"
    } catch (e) {
        console.log(e);
        return "Failed to create a music object! Check console!"
    }
}