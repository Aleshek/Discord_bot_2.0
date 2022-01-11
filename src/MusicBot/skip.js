const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips currently playing song')
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
    async execute(interaction) {
        const hidden = interaction.options.getBoolean('hidden') || false;
        console.log(serverQueue.length);
        if (serverQueue.length > 1) {
            console.log("SKIP QUEUE >1");
            serverQueue.shift();

            let resource = createAudioResource(serverQueue[0].object);
            console.log("[Music Bot] - Skipping song");
            player.play(resource);
            await interaction.reply({ content: "Skipped", ephemeral: true });
        } else {
            console.log("SKIP QUEUE <1");
            serverQueue.shift();
            player.stop();

            if(hidden==true){
                await interaction.reply({ content: "Stopped", ephemeral: true });
            } else {
                await interaction.reply({ content: "Stopped", ephemeral: false });
            }
            
        }
    }
}