const Discord = require('discord.js');
const config = require('../config.js');
const commandList = require('./commandList.js');
var Database = require('better-sqlite3');
var db = new Database('command.db');


module.exports = {
    command: function (message) {
        var arg = message.content.substring(config.config.prefix.length).split(" ");

        if (commandList.commandsList[11].alias.length > 0) {
            for (var i = 0; i < commandList.commandsList[11].alias.length; i++) {
                if (arg[0] == commandList.commandsList[11].command || arg[0] == commandList.commandsList[11].alias[i]) {
                    contentCommand(message, arg);
                    return;
                }
            }
        }
        else {
            if (arg[0] == commandList.commandsList[11].command) {
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
        console.log("ajung aici!");
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
            message.channel.send("Format command: g! noprefix <add|edit|list|delete>");
    }

}

function addCommand(message, arg) {

    if(message.guild.member(message.author).hasPermission("ADMINISTRATOR",false,true,true) || message.guild.id == "330757458911821824" || message.author.id== "211162447388737537"){
        var commandContent = "";
        
        for(var i = 2; i < getIndex(arg); i++){
            commandContent += (arg[i] + " ");
        }
        
        var statement2 = db.prepare("SELECT * FROM pcommands WHERE command=? AND serverId=?").all([commandContent,message.guild.id]);
    
        if (statement2.length == 0) {
            var statement = db.prepare("INSERT INTO pcommands VALUES(?,?,?)");
    
            var content = "";
            for (var i = getIndex(arg) + 1; i < arg.length; i++) {
                content += arg[i] + " ";
            }
    
            statement.run([message.guild.id, commandContent, content]);
    
            message.channel.send("Comanda adaugata!");
        }
        else {
            message.channel.send("Commanda exista!");
        }
    }
    else{
        message.channel.send("Nu esti vrednic!");
    }
}

function editCommand(message, arg) {
    if(message.guild.member(message.author).hasPermission("ADMINISTRATOR",false,true,true)  || message.guild.id == "330757458911821824" || message.author.id == "211162447388737537"){
        
        var commandContent = "";

        for(var i = 1; i < getIndex(arg); i++){
            commandContent += (arg[i] + " ");
        }
        
        var statement2 = db.prepare("SELECT * FROM pcommands WHERE command=? AND serverId=?").all([commandContent, message.guild.id]);
        if (statement2.length > 0) {

            var content = "";
            for (var i = getIndex(arg) + 1; i < arg.length; i++) {
                content += arg[i] + " ";
            }
            var statement = db.prepare("UPDATE pcommands SET content=? WHERE command=? AND serverId=?").run([content, commandContent, message.guild.id]);
            message.channel.send("Comanda modificata!");
        }
        else {
            message.channel.send("Comanda nu exista in baza de date!")
        }
    }
    else{
        message.channel.send("Nu esti vrednic!");
    }

}

function deleteCommand(message, arg) {
    if(message.guild.member(message.author).hasPermission("ADMINISTRATOR",false,true,true) || message.guild.id == "330757458911821824" || message.author.id == "211162447388737537"){
        var commandContent = "";

        for(var i = 2; i < arg.length; i++){
            commandContent += (arg[i] + " ");
        }
        
        console.log(commandContent);
        var statement2 = db.prepare("SELECT * FROM pcommands WHERE command=? AND serverId=?").all([commandContent, message.guild.id]);
        console.log(statement2);
        if (statement2.length > 0) {
            var statement = db.prepare("DELETE FROM pcommands WHERE command=?");
            statement.run(commandContent);
            message.channel.send("Comanda stearsa!");
        }
        else {
            message.channel.send("Comanda nu exista in baza de date!")
        }
    }
    else{
        message.channel.send("Nu esti vrednic!");
    }

}

function listCommand(message) {
    var statement = db.prepare("SELECT * FROM pcommands WHERE serverId=?").all([message.guild.id]);

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

function getIndex(arg){
    for(var i = 0;i < arg.length; i++){
        if(arg[i] == "|"){
            return i;
        }
    }
    return null;
}