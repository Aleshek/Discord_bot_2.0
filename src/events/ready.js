const globals = require('../system/globals.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log("[Ready Event] Client is ready!");
        globals.execute(client);
    },
};