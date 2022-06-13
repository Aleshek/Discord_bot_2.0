/*
`` - ALTGR + 7(ý)
autoformat VSC Shift + Alt + F
autoformat MSVS Ctrl+K -> Ctrl+D
*/
const { Client, Intents, DiscordAPIError, Collection, GuildMemberManager, GuildManager } = require('discord.js');
const { token } = require('./system/config.json');

const deployCommands = require('./system/deploy_commands.js');
const fs = require('fs');
const { skip } = require('./commands/ignore.json');
const { musicSkip } = require('./MusicBot/ingore.json');
const { AudioPlayerStatus } = require('@discordjs/voice');


const client = new Client({ intents: 32767, partials:['CHANNEL'] }); //PARTIAL FOR RECEIVING DMS 

//-------------------------------------COMMANDS-------------------------------------------------------------
client.commands = new Collection();

const commandFolders = fs.readdirSync('./src/commands'); //find command folder names
const ignoredFolders = skip;
for (const folder of commandFolders) {
    if (!ignoredFolders.includes(folder)) {
        const fileName = folder + ".js";
        try {
            const command = require(`./commands/${folder}/${fileName}`);
            client.commands.set(command.data.name, command);
        } catch (e) {
            console.log(e);
            console.log(`[Index] Couldn't import ${fileName}! Skipping`);
        }
    } else {
        console.log(`[Index] Skipped ${folder}`);
    }
}
//----------------------------------------------------------------------------------------------------
//------------------------------MUSIC BOT COMMANDS-------------------------------
const musicFolder = fs.readdirSync('./src/MusicBot').filter(file => file.endsWith('.js'));
const ignoredMusicFiles = musicSkip;
for (const file of musicFolder) {
    if (!ignoredMusicFiles.includes(file)) {
        //const fileName_M = file + ".js"
        try {
            const command = require(`./MusicBot/${file}`);
            client.commands.set(command.data.name, command);
        } catch (e) {
            console.log(e);
            console.log(`[Index] Couldn't import ${file}! Skipping`);
        }
    } else {
        console.log(`[Index] Skipped ${file}`);
    }
}
//----------------------------------------------------------------------------


//----------------------------Events------------------------------------------
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//-------------------------------------------------------------------------


client.login(token);

