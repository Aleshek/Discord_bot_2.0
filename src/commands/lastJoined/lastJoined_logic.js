const fs = require('fs');
const fileName = './src/commands/lastJoined/lastJoined.json'
//const file = require('./lastJoined.json');

var fileContent = fs.readFileSync(fileName);
var content = JSON.parse(fileContent);

exports.joined = function (time, userID, channelID){ //join event with date
    console.log(`User ${userID} joined the channel ${channelID} at ${time}`);
    for(const user of content){
        if(user.id == userID){ //if user is already on the list
            user.lastJoin = time;
            fs.writeFile(fileName, JSON.stringify(content, null, 2), function writeJSON(err){
                if (err) return console.log(err);
            });
            return;
        }
    }
    //if user isn't on the list
    var newEntry = {
        id: userID,
        lastJoin: time,
        lastLeave: ""
    }
    content.push(newEntry);
    fs.writeFile(fileName, JSON.stringify(content, null, 2), function writeJSON(err){
        if (err) return console.log(err);
    });   
}

exports.left = function (time, userID, channelID){ //leave event with date
    console.log(`User ${userID} left the channel ${channelID} at ${time}`)
    for(const user of content){
        if(user.id == userID){ //if user is already on the list
            user.lastLeave = time;
            fs.writeFile(fileName, JSON.stringify(content, null, 2), function writeJSON(err){
                if (err) return console.log(err);
            });
            return;
        }
    }
    //if user isn't on the list (IN THIS CASE SHOULD NOT BE POSSIBLE)
    var newEntry = {
        id: userID,
        lastJoin: "",
        lastLeave: time
    }
    content.push(newEntry);
    fs.writeFile(fileName, JSON.stringify(content, null, 2), function writeJSON(err){
        if (err) return console.log(err);
    });
}