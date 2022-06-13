const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('message')
    .setDescription('send dm to someone through me :)')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('target user')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('message')
        .setDescription('message itself')
        .setRequired(true)    
    )
    .addBooleanOption(option =>
        option.setName('hidden')
            .setDescription('should the reply be hidden? (default false)')
            .setRequired(false)
    ),
    async execute(interaction){
        const hidden = interaction.options.getBoolean('hidden') || false;
        const user = interaction.options.getUser('user');
        const originUser = interaction.user;
        const targetUser = interaction.guild.members.cache.get(user.id);
        const message = interaction.options.getString('message');
        var status;
        try{
            targetUser.send(message);
            status = "Done :)";
        } catch(e){
            status = "Failed :(";
        }
        

        if (hidden === false) {
            await interaction.reply({content: status, ephemeral:false});
        } else {
            await interaction.reply({content: status, ephemeral:true});
        }
    }
}