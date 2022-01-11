const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatText } = require('../system/utility.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Queue')
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
    async execute(interaction) {
        const hidden = interaction.options.getBoolean('hidden') || false;
        var nowPlaying = "Now playing:\n";
        if (serverQueue.length > 0) {
            nowPlaying += serverQueue[0].title + " | " + serverQueue[0].url + "\n";
        }
        var formatedNowPlaying = formatText(nowPlaying);

        var queue = "Queue:\n";
        if (serverQueue.length > 0) {
            for (i = 1; i < serverQueue.length; i++) {
                queue += " - " + "ID:" + i + " - \n" + serverQueue[i].title + " | " + serverQueue[i].url + "\n";
            }
        }
        var formatedQueue = formatText(queue);
        var output = formatedNowPlaying + formatedQueue;

        if (hidden == true) {
            await interaction.reply({ content: output, ephemeral: true });
        } else {
            await interaction.reply({ content: output, ephemeral: false });
        }

    }
}