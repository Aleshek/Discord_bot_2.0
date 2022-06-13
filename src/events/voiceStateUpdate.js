const lastJoined = require('../commands/lastJoined/lastJoined_logic');

module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState){
        if(newState.channelId === null){ //left
            var rawLeaveTime = new Date();
            var leaveTime = `${rawLeaveTime.getDate()}.${rawLeaveTime.getMonth()}.${rawLeaveTime.getFullYear()} ${rawLeaveTime.getHours()}:${rawLeaveTime.getMinutes()}:${rawLeaveTime.getSeconds()}:${rawLeaveTime.getMilliseconds()}`
            lastJoined.left(leaveTime, oldState.id, oldState.channelId);          
        } else if (oldState.channelId === null){ //joined
            var rawJoinTime = new Date();
            var joinTime = `${rawJoinTime.getDate()}.${rawJoinTime.getMonth()}.${rawJoinTime.getFullYear()} ${rawJoinTime.getHours()}:${rawJoinTime.getMinutes()}:${rawJoinTime.getSeconds()}:${rawJoinTime.getMilliseconds()}`
            lastJoined.joined(joinTime, newState.id, newState.channelId);
        } 
    }
}