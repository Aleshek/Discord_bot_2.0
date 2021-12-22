const fs = require('fs');
const config = require('./config.json');

/**
 * 
 * @param {*} obj 
 * @returns 
 */
exports.isObject = function (obj) { //CHECK IF VARIABLE IS AN OBJECT OR NOT (RETURNS TRUE/FALSE)
    return Object.prototype.toString.call(obj) === '[object Object]'
}


exports.randomInt = function (min, max) { //RANDOM INT
    if (min == max) {
        return min;
    }
    if (min > max) {
        var buffer = min;
        min = max;
        max = buffer;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

//----------------------------FILE MANAGEMENT   (VERY OLD, PROBABLY SHOULD NOT USE BEFORE TESTING/REWRITING)--------------------------------------
exports.loadFile = function (filePATH) { //LOAD
    var data = fs.readFileSync(filePATH);
    console.log("***[Utility.loadFile loaded[" + data + "] from [" + filePATH + "]]");
    return data;
}
exports.loadFile = function (filePATH, no_log) { //LOAD WITH LOGGING OPTION
    var data = fs.readFileSync(filePATH);
    if (no_log != 1) {
        console.log("***[Utility.loadFile loaded[" + data + "] from [" + filePATH + "]]");
    } else {
        console.log("***[Utility.loadFile loaded[HIDDEN] from [" + filePATH + "]]");
    }
    return data;
}

exports.saveFile = function (filePATH, data) { //SAVE
    fs.writeFileSync(filePATH, data);
    console.log("***[Utility.saveFile saved[" + data + "] to [" + filePATH + "]]");
}
exports.saveFile = function (filePATH, data, no_log) { //SAVE
    fs.writeFileSync(filePATH, data);
    if (no_log != 1) {
        console.log("***[Utility.saveFile saved[" + data + "] to [" + filePATH + "]]");
    } else {
        console.log("***[Utility.saveFile saved[HIDDEN] to [" + filePATH + "]]");
    }
}
//-----------------------------------------------------------------------------------------------------------------------

//FORMATING  STUFF  -------------------------------------------------------------------------------------------------
exports.spacing = function (inputArray) {
    var longestString = 0;
    var outputArray = inputArray;
    for (i = 0; i < inputArray.length; i++) {
        if (inputArray[i].length > longestString) {
            longestString = inputArray[i].length;
        }
    }
    for (a = 0; a < inputArray.length; a++) {
        var numberOfSpaces = (longestString - inputArray[a].length) + 1;
        for (b = 0; b <= numberOfSpaces; b++) {
            outputArray[a] += " ";
        }
    }
    return outputArray;
}
exports.formatText = function (input) {
    return ("```" + input + "```");
}
exports.formatTextCSS = function (input) { //HIGHLIGHTING CURRENTLY ISN'T SUPPORTED BY DISCORD, USING SYNTAX HIGHLIGHTING IS ONLY WAY TO HAVE SOME RESSEMBLANCE OF COLOR FORMATING
    return ("```css\n" + input + "```");
}
exports.removeSpaces = function (input) {
    return (input.replace(/\s+/g, ''));
}
exports.replaceCharacters = function (input, char1, char2) {
    return (input.replace(char1, char2));
}
//---------------------------------------------------------------------------------------


//ADMINISTRATION --------------------------------------------------------------------
/*exports.clearChannel = async function (message) { //CLEARS CHAT
    let to_delete;
    do {
        try {
            to_delete = await message.channel.fetchMessages({ limit: 100 });
            message.channel.bulkDelete(to_delete);
        } catch (e) {
            console.log('UTILITY.JS -> clearChannel -> [' + e + ']');
        }

    } while (to_delete.size > 1);
}*/
//ADMINISTRAION -------------------------------------------------------------------

/*exports.errorMessage = function (code) { //RETURNS ERROR MSG
    switch (code) {
        case 'SYNTAX': return config.ERRORMSG_SYNTAX; break;
        case 'OTHER': return config.ERRORMSG_1; break;
        default: return "Unknown error code!"
    }
}*/

/*exports.getUserPermissionLevel = function (user) {
    try {
        var author_permission_level = perms.default;
        if (this.isObject(user) == true) { //IF AN OBJECT IS PASSED
            for (i = 0; i < perms.users.length; i++) {
                if (user.author.id == perms.users[i].id) {
                    author_permission_level = perms.users[i].permission_level;
                    break;
                }
            }
        } else { //IF A STRING IS PASSED
            for (i = 0; i < perms.users.length; i++) {
                if (user == perms.users[i].id) {
                    author_permission_level = perms.users[i].permission_level;
                    break;
                }
            }
        }
        return author_permission_level;
    } catch (e) {
        console.log("*** Utility/getUserPermissionLevel error -> " + e);
        return -1;
    }
}*/
