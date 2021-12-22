const { SlashCommandBuilder } = require('@discordjs/builders');
const {formatText} = require('../system/utility.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Queue'),
        async execute(interaction){
            var nowPlaying = "Now playing:\n";
            if(serverQueue.length > 0){
                nowPlaying += serverQueue[0].title + " | " + serverQueue[0].url + "\n";
            }
            var formatedNowPlaying = formatText(nowPlaying);

            var queue = "Queue:\n";
            if(serverQueue.length > 0){
                for (i = 1; i < serverQueue.length; i++) {
                    queue += " - " + i + " - \n" + serverQueue[i].title + " | " + serverQueue[i].url + "\n";
                }
            }
            var formatedQueue = formatText(queue);
            var output = formatedNowPlaying + formatedQueue;
            await interaction.reply({ content: output, ephemeral: true });
        }
}