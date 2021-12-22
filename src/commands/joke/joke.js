const { SlashCommandBuilder } = require('@discordjs/builders');
const utility = require('../../system/utility.js');

var jokes = [];
const jokesPATH = ('./src/commands/joke/jokes.txt');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Random very funny joke from a local library of random very funny jokes. Poggers')
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Should the reply be hidden? (default:false)')
                .setRequired(false)
        ),
        async execute(interaction){
            const hidden = interaction.options.getBoolean('hidden') || false;
            await loadJokes();
            const output = tellJoke();
            await interaction.reply({content: output, ephemeral:hidden});
        }
}

function tellJoke(){
    var randomInt = utility.randomInt(0, jokes.length-1);
    //console.log(jokes[randomInt]);
    return jokes[randomInt]
}

async function loadJokes(){
    resetJokeList();
    try{
        var splitOutput = (utility.loadFile(jokesPATH,1) + '').split(';');
        splitOutput.forEach(function(element){
            jokes.push(element);
        })
    } catch(e){
        console.log(e);
    }
}

function resetJokeList(){
    jokes = [];
}