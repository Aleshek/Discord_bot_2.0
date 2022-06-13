const { SlashCommandBuilder } = require('@discordjs/builders');
const list = require('./lastJoined.json');
const utility = require('../../system/utility');




module.exports = {
    data: new SlashCommandBuilder()
    .setName('activity')
    .setDescription('List of all members and their last time joining VC')
    .addBooleanOption(option =>
        option.setName('hidden')
            .setDescription('Should the reply be hidden? (default:false)')
            .setRequired(false)
    ),
    async execute(interaction){
        const hidden = interaction.options.getBoolean('hidden') || false;
        var output = "ACTIVITY LIST :)\n";
        output += "__________________\n";

        //interaction.guild.members.cache.get(user.id);

        //console.log(content);
        list.forEach(user => {
            var member = interaction.guild.members.cache.get(user.id).displayName  || user.id;
            output += `\n - ID/Name:${member}\n   Last join:${user.lastJoin}\n   Last leave:${user.lastLeave}\n______\n`;
        });

        output += "\n__________________";
        output = utility.formatText(output);
        



        if (hidden === false) {
            await interaction.reply({content: output, ephemeral:false});
        } else {
            await interaction.reply({content: output, ephemeral:true});
        }
    }
}