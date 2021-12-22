const { SlashCommandBuilder } = require('@discordjs/builders');
const { games } = require('./games.json');
const utility = require('../../system/utility.js');



var id_list = [];
var name_list = [];
var maxPlayers_list = [];
var recentlyRolled_list = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamelist')
        .setDescription('Gamelist desc - TODO')
        .addSubcommand(options =>
            options.setName('list')
                .setDescription('(recently rolled does not work) Gamelist show list desc - TODO')
                .addBooleanOption(option =>
                    option.setName('hidden')
                        .setDescription('Should the reply be hidden? (default: false)')
                        .setRequired(false)
                )
        )
        .addSubcommand(options =>
            options.setName('roll')
                .setDescription('Gamelist roll desc - TODO')
                .addIntegerOption(option =>
                    option.setName('players')
                        .setDescription('Maximum number of possible players')
                        .setRequired(false)
                )
                .addBooleanOption(option =>
                    option.setName('hidden')
                        .setDescription('Should the reply be hidden? (default: false)')
                        .setRequired(false)
                )
        )
        .addSubcommand(options =>
            options.setName('reset')
                .setDescription('Gamelist reset roll count')
                .addBooleanOption(option =>
                    option.setName('hidden')
                        .setDescription('Should the reply be hidden? (default: false)')
                        .setRequired(false)
                )
        ),
    async execute(interaction) {
        createLists();
        let output = " ";
        const subcommand = interaction.options.getSubcommand();
        const maxPlayers = interaction.options.getInteger('players') || 99;
        const hidden = interaction.options.getBoolean('hidden') || false;
        switch (subcommand) {
            case "list": output = createGamelistMessage(); break; //list
            case "roll": output = roll(maxPlayers); break; //roll
            case "reset": output = recentRollReset(); break; //reset
            default: await interaction.reply('should be imposible to get here, but just in case');
        }
        await interaction.reply({content: output, ephemeral:hidden});
    }
}

function resetLists() {
    id_list = [];
    name_list = [];
    maxPlayers_list = [];
    recentlyRolled_list = [];
}

function createLists() {
    resetLists();
    for (const game of games) {
        id_list.push(game.id);
        name_list.push(game.name);
        maxPlayers_list.push(game.max_players);
        recentlyRolled_list.push(game.recently_rolled);
    }
}

function createGamelistMessage() { 
    let output = "";
    name_list = utility.spacing(name_list);
    maxPlayers_list = utility.spacing(maxPlayers_list);
    recentlyRolled_list = utility.spacing(recentlyRolled_list);
    for (c = 0; c < id_list.length; c++) {
        output += "\n " + name_list[c] + "|Max players: " + maxPlayers_list[c] + "|Recently rolled: " + recentlyRolled_list[c]
    }
    return utility.formatText(output)
}

function roll(maxPl) {
    const min = games[0].id;
    const max = games.length - 1;
    if (maxPl > 99 || maxPl < 1) {
        return "Nothing :)"
    }
    for (i = 0; i < 50; i++) {
        var randomInt = utility.randomInt(min, max);
        if (maxPl <= games[randomInt].max_players) {
            break;
        }
    }
    games[randomInt].recently_rolled++;
    const output = games[randomInt].name + " | recently rolled: " + games[randomInt].recently_rolled;
    return output
}

function recentRollReset(){
    for(const game of games){
        game.recently_rolled = 0;
    }
    return "Done!"
}