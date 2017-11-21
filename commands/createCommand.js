const Discord = require('discord.js');
const config = require('../config.js');
const commandList = require('./commandList.js');
var Database = require('better-sqlite3');
var db = new Database('command.db');


module.exports = {
    command: function (message) {
        var arg = message.content.substring(config.config.prefix.length).split(" ");

        if (commandList.commandsList[14].alias.length > 0) {
            for (var i = 0; i < commandList.commandsList[14].alias.length; i++) {
                if (arg[0] == commandList.commandsList[14].command || arg[0] == commandList.commandsList[14].alias[i]) {
                    contentCommand(message, arg);
                    return;
                }
            }
        }
        else {
            if (arg[0] == commandList.commandsList[14].command) {
                contentCommand(message, arg);
                return;
            }

        }
    }
}

//TODO: verificare daca e mai vechi de 2 saptamani si adaugare permisie
function contentCommand(message, arg) {
    switch (arg[1]) {
        case "add":
            addCommand(message, arg);
            break;
        case "edit":
            editCommand(message, arg);
            break;
        case "delete":
            deleteCommand(message, arg);
            break;
        case "list":
            listCommand(message);
            break;
        default:
            message.channel.send("Format command: g! ccomand <add|edit|alias|delete>");
    }

}

function addCommand(message, arg) {

    var statement2 = db.prepare("SELECT * FROM commands WHERE command=?").all(arg[2]);

    var errorCommand = false;
    for (var i = 0; i < commandList.commandsList.length; i++) {
        for (var j = 0; j < commandList.commandsList[i].alias.length; j++) {
            if (arg[2] == commandList.commandsList[i].command || arg[2] == commandList.commandsList[i].alias[j]) {
                errorCommand = true;
            }
        }
    }

    if (statement2.length == 0 && errorCommand == false) {
        var statement = db.prepare("INSERT INTO commands VALUES(?,?,?)");

        var content = "";
        for (var i = 3; i < arg.length; i++) {
            content += arg[i] + " ";
        }

        statement.run([message.guild.id, arg[2], content]);

        message.channel.send("Comanda adaugata!");
    }
    else {
        message.channel.send("Commanda exista!");
    }
}

function editCommand(message, arg) {
    var statement2 = db.prepare("SELECT * FROM commands WHERE command=? AND serverId=?").all([arg[2], message.guild.id]);
    if (statement2) {

        var content = "";
        for (var i = 3; i < arg.length; i++) {
            content += arg[i] + " ";
        }
        var statement = db.prepare("UPDATE commands SET content=? WHERE command=? AND serverId=?").run([content, arg[2], message.guild.id]);
        message.channel.send("Comanda modificata!");
    }
    else {
        message.channel.send("Comanda nu exista in baza de date!")
    }

}

function deleteCommand(message, arg) {
    var statement2 = db.prepare("SELECT * FROM commands WHERE command=? AND serverId=?").all([arg[2], message.guild.id]);
    if (statement2) {
        var statement = db.prepare("DELETE FROM commands WHERE command=?");
        statement.run(arg[2]);
        message.channel.send("Comanda stearsa!");
    }
    else {
        message.channel.send("Comanda nu exista in baza de date!")
    }

}

function listCommand(message) {
    var statement = db.prepare("SELECT * FROM commands WHERE serverId=?").all([message.guild.id]);

    var content = "";
    if (statement.length == 0) {
        content = "-";
    }
    else {
        for (var i = 0; i < statement.length; i++) {
            content += ("**" + statement[i].command + "**: " + statement[i].content + "\n");
        }
    }

    var embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("Commands:", content)
        .setFooter("Requested by " + message.author.username);

    message.channel.send({ embed });
}