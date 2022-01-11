const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music bot')
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
        async execute(interaction){
            const hidden = interaction.options.getBoolean('hidden') || false;
            var output = "";
            try{
                serverQueue=[];
                player.stop();
                const channel = interaction.member?.voice.channel;
                var connection = getVoiceConnection(channel.guild.id);
                connection.destroy();
                output = "Stopped!";
                //await interaction.reply({ content: "Stopped", ephemeral: true });
            } catch(e){
                output = "Music bot could not be stopped";
                //await interaction.reply({ content: "Music bot could not be stopped", ephemeral: true });
            }
            if(hidden==true){
                await interaction.reply({ content: output, ephemeral: true }); 
            } else {
                await interaction.reply({ content: output, ephemeral: false }); 
            }
                       
        }
}