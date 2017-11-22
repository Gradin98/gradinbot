
const comenzi = require('../commands/commandList.js');
const config = require('../config.js');
var Database = require('better-sqlite3');
var db = new Database('command.db');

module.exports = {
    message: function (bot) {
        bot.on("message", function (message) {
            if (message.guild != null) {
                console.log("[" + message.guild.name + " - " + message.author.username + "] : " + message.content);
            }

            if (message.author.equals(bot.user)) return;

            message.content = message.content.toLowerCase();


            var statement;
            if (message.guild != null) {
                statement = db.prepare("SELECT * FROM pcommands where serverId=?").all(message.guild.id);

                for (var i = 0; i < statement.length; i++) {
                    if ((message.content + " ") == statement[i].command) {
                        message.channel.send(statement[i].content);
                        return;
                    }
                }
            }


            if (!message.content.startsWith(config.config.prefix)) return;

            var arg = message.content.substring(config.config.prefix.length).split(" ");

            var statement;
            if (message.guild != null) {
                statement = db.prepare("SELECT * FROM commands where serverId=?").all(message.guild.id);

                for (var i = 0; i < statement.length; i++) {
                    if (arg[0] == statement[i].command) {
                        message.channel.send(statement[i].content);
                        return;
                    }
                }

            }

            for (var i = 0; i < comenzi.commandsList.length; i++) {
                if (comenzi.commandsList[i].alias.length > 0) {
                    for (var j = 0; j < comenzi.commandsList[i].alias.length; j++) {
                        if (comenzi.commandsList[i].command == arg[0] || comenzi.commandsList[i].alias[j] == arg[0]) {
                            comenzi.commandsList[i].function(message);
                            return;
                        }
                    }
                }
                else if (comenzi.commandsList[i].command == arg[0]) {
                    comenzi.commandsList[i].function(message);
                    return;
                }

            }

            for (var i = 0; i < comenzi.commandsList.length; i++) {
                if (comenzi.commandsList[i].alias.length > 0) {
                    for (var j = 0; j < comenzi.commandsList[i].alias.length; j++) {
                        if (comenzi.commandsList[i].command == arg[0] || comenzi.commandsList[i].alias[j] == arg[0]) {
                            continue;
                        }
                    }
                }
                else if (comenzi.commandsList[i].command == arg[0]) {
                    continue;
                }
                else {
                    message.channel.send("Executa comanda g! help pentru o lista de comenzi!");
                    return;
                }
            }
        });
    }
}
