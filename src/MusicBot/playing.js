const { SlashCommandBuilder } = require('@discordjs/builders');
const {formatText} = require('../system/utility.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playing')
        .setDescription('Currently playing')
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
        async execute(interaction){
            const hidden = interaction.options.getBoolean('hidden') || false;
            var output = "Now playing:\n";
            if(serverQueue.length > 0){
                output += serverQueue[0].title + " | " + serverQueue[0].url + "\n";
            }
            var formatedOutput = formatText(output);

            if(hidden == true){
                await interaction.reply({ content: formatedOutput, ephemeral: true });
            } else {
                await interaction.reply({ content: formatedOutput, ephemeral: false });
            }           
        }
}