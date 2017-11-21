var Database = require('better-sqlite3');
var db = new Database('command.db');

module.exports = {
    ready: function(bot){
        bot.on("ready", () => {
            console.log('The bot is ready!'); 

            bot.user.setPresence({ game: { name: 'g! help', type: 0 } }); 

            createDatabase();
        });
    }
}

function createDatabase() {
    var statement = db.prepare("CREATE TABLE IF NOT EXISTS commands (serverId TEXT,command TEXT, content TEXT)");
    statement.run();
    db.close();
}