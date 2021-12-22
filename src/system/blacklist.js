
const bList = require('./blacklist.json');
var blockedUsers = [];
module.exports = {
    execute() {
        for (user of bList.blacklist) {
            blockedUsers.push(user.id);
        }
        return blockedUsers
    }
}