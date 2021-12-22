const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('first testing command.'),
    async execute(interaction) {
        await interaction.reply('Test' + test(1, 2));
    },
}
function test(a, b) {
    return a + b
}