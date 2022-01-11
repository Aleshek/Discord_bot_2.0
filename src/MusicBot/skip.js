const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips currently playing song')
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('Optional ID of a song to skip (use Queue to see song IDs)/ID:0 is current song')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
    async execute(interaction) {
        var output = "";
        const hidden = interaction.options.getBoolean('hidden') || false;
        const skipID = interaction.options.getInteger('id') || 0;
        //console.log(serverQueue.length);
        if (serverQueue.length > 1) {
            console.log("SKIP QUEUE >1");
            if (skipID > 0 && serverQueue.length > skipID) { //skipping song other than the one already playing
                const skippedSongURL = serverQueue[skipID+1].url;
                serverQueue.splice(skipID + 1, 1);
                output = `${skippedSongURL} with ID:${skipID} was removed from the queue!`; //DONE
            } else if (skipID == 0) {
                const skippedSongURL = serverQueue[0];
                serverQueue.shift();
                console.log("[Music Bot] - Skipping song");
                try{
                    let resource = createAudioResource(serverQueue[0].object);                    
                    player.play(resource);
                    output = `${skippedSongURL} was skipped!`;
                } catch(e){
                    console.log(e);
                    output = `Could not play the next resource! (${serverQueue[0].url})`;
                }

                if(hidden==true){
                    await interaction.reply({ content: output, ephemeral: true });
                } else {
                    await interaction.reply({ content: output, ephemeral: false });
                }
                
            }


        } else {
            console.log("SKIP QUEUE <1");
            serverQueue.shift();
            player.stop();

            if (hidden == true) {
                await interaction.reply({ content: "The queue is empty, music bot stopped!", ephemeral: true });
            } else {
                await interaction.reply({ content: "The queue is empty, music bot stopped!", ephemeral: false });
            }

        }
    }
}