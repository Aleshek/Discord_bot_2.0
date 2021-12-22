const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('blueprint')
    .setDescription('blueprint desc')
    .addBooleanOption(option =>
        option.setName('hidden')
            .setDescription('Should the reply be hidden? (default:false)')
            .setRequired(false)
    ),
    async execute(interaction){
        const hidden = interaction.options.getBoolean('hidden') || false;
    }
}