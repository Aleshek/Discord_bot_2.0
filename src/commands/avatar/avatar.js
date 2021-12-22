const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays tagged users avatar')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Displays tagged users avatar')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const hidden = interaction.options.getBoolean('hidden') || false;
        const avatarEmbed = new MessageEmbed()
            .setColor(0x111111)
            .setTitle(user.displayAvatarURL())
            .setAuthor(user.username)
            .setImage(user.displayAvatarURL());

        if (hidden === true) {
            await interaction.reply({ embeds: [avatarEmbed], ephemeral: true });
        } else {
            await interaction.reply({ embeds: [avatarEmbed] });
        }
    }
}