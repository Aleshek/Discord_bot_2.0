const { SlashCommandBuilder } = require('@discordjs/builders');
const {formatText} = require('../system/utility.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playing')
        .setDescription('Currently playing'),
        async execute(interaction){
            var output = "Now playing:\n";
            if(serverQueue.length > 0){
                output += serverQueue[0].title + " | " + serverQueue[0].url + "\n";
            }
            var formatedOutput = formatText(output);
            await interaction.reply({ content: formatedOutput, ephemeral: true });
        }
}