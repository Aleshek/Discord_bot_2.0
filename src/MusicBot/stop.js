const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music bot'),
        async execute(interaction){
            try{
                serverQueue=[];
                player.stop();
                const channel = interaction.member?.voice.channel;
                var connection = getVoiceConnection(channel.guild.id);
                connection.destroy();
                await interaction.reply({ content: "Stopped", ephemeral: true });
            } catch(e){
                await interaction.reply({ content: "Music bot could not be stopped", ephemeral: true });
            }
            
        }
}