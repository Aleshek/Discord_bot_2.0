const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Returns information about tagged user')
        .addStringOption(option =>
            option.setName('server')
                .setDescription('Displays information about the server. Use "server" instead of user tag')
                .setRequired(false)
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Displays informations about a user')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default false')
                .setRequired(false)
        ),
    async execute(interaction) {
        var infoEmbed;
        const hidden = interaction.options.getBoolean('hidden') || false;
        const serverCheck = interaction.options.getString('server');
        if (serverCheck === 'server') {
            const server = interaction.guild;
            infoEmbed = new MessageEmbed()
                .setAuthor(server.name)
                .addFields(
                    {
                        name: 'Server ID',
                        value: server.id,
                    },
                    {
                        name: 'Server name',
                        value: server.name,
                    },
                    {
                        name: 'Description',
                        value: server.description || 'None',
                    },
                    {
                        name: 'Server owner ID',
                        value: server.ownerId,
                    },
                    {
                        name: 'Member count',
                        value: (server.memberCount + ' / ' + server.maximumMembers),
                    },
                    {
                        name: 'Creation date',
                        value: new Date(server.createdTimestamp).toLocaleDateString(),
                    },
                    {
                        name: 'NSFW level ?',
                        value: server.nsfwLevel,
                    }
                )
                .setImage(server.iconURL())
                .setColor(0x111111);
        } else {
            const user = interaction.options.getUser('user') || interaction.user;
            const member = interaction.guild.members.cache.get(user.id);
            infoEmbed = new MessageEmbed()
                .setTitle("Information")
                .addFields(
                    {
                        name: 'ID',
                        value: user.id
                    },
                    {
                        name: 'Username',
                        value: user.username,
                    },
                    {
                        name: 'Nickname',
                        value: member.nickname || 'No nickname',
                    },
                    {
                        name: 'Joined this server',
                        value: new Date(member.joinedTimestamp).toLocaleDateString(),
                    },
                    {
                        name: 'Account created',
                        value: new Date(user.createdTimestamp).toLocaleDateString(),
                    },
                    /*{
                        name: 'Status',
                        value: member.presence.status || "Could not be verified",
                    },*/
                    {
                        name: 'Display color',
                        value: member.displayHexColor,
                    },                   
                )
                .setImage(user.displayAvatarURL())
                .addField('Avatar URL', user.displayAvatarURL() || 'missing url')
                .setColor(0x111111);
        }

        if (hidden === false) {
            await interaction.reply({ embeds: [infoEmbed] });
        } else {
            await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
        }

    }
};
