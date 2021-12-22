const { SlashCommandBuilder } = require('@discordjs/builders');
const utility = require('../../system/utility.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a random Integer between x and y')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('Min')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('Max')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default:false)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const hidden = interaction.options.getBoolean('hidden') || false;
        const min = interaction.options.getInteger('min');
        const max = interaction.options.getInteger('max');
        const randomInt = utility.randomInt(min, max);
        var output = randomInt;
        console.log(output);
        if (min > max) {
            output = ">:c";
        }

        await interaction.reply({ content: output.toString(), ephemeral: hidden });
    }
}