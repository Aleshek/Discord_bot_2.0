const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID, token } = require('./config.json');
const fs = require('fs');
const { skip } = require('../commands/ignore.json');
const { musicSkip } = require('../MusicBot/ingore.json');

const commands = [];
const commandFolders = fs.readdirSync('./src/commands');
const musicFolder = fs.readdirSync('./src/MusicBot').filter(file => file.endsWith('.js'));
const ignoredFolders = skip;
const ignoredMusicFolders = musicSkip;

//-----------------COMMANDS--------------------------------------------------------------
for (const folder of commandFolders) {
    if (!ignoredFolders.includes(folder)) {
        const fileName = folder + ".js";
        try {
            const command = require(`../commands/${folder}/${fileName}`);
            commands.push(command.data.toJSON());
        } catch (e) {
            console.log(`[Command Deploy]Couldn't import ${fileName}! Skipping`);
        }
    } else {
        console.log(`[Command Deploy] Skipped ${folder}`);
    }
}
//-------------------------------------------------------------------------------------
//---------------------------MUSIC COMMANDS-----------------------------------------
console.log(ignoredMusicFolders)
for (const file of musicFolder) {
    if (!ignoredMusicFolders.includes(file)) {
        try {
            const command = require(`../MusicBot/${file}`);
            commands.push(command.data.toJSON());
        } catch (e) {
            console.log(`[Command Deploy]Couldn't import ${file}! Skipping`);
        }
    } else {
        console.log(`[Command Deploy] Skipped ${file}`);
    }
}
//---------------------------------------------------------------------------------
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => console.log('[Command Deploy] Successfully registered application commands.'))
    .catch(console.error);

