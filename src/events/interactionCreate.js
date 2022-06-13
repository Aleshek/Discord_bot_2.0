const bList = require('../system/blacklist.js');

var blockedUsers;

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {


        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        if(!blockedUsers){
            blockedUsers = bList.execute();
        }
        if(blockedUsers.includes(interaction.user.id)){
            return interaction.reply({ content: "Could not execute this command!", ephemeral: true });
        }

        try {
            await command.execute(interaction);
        } catch (e) {
            console.error(e);
            return interaction.reply({ content: "Could not execute this command, check console!", ephemeral: true });
        }
    },
};
