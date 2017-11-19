const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');
const google = require('google');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[12].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[12].alias.length; i++){
                if(arg[0] == commandList.commandsList[12].command || arg[0] == commandList.commandsList[12].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[12].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    var letters = '0123456789ABCDEF';
    var color = "0x";
    var id = "348771503359131649";
    var member = message.guild.members.find("id",id);
    if(arg[1] != null){
        console.log("am intrat aici");
        let index = parseInt(arg[1]);
        index = index - 1;
        if(index >= 0 && index <= commandList.commandsList.length){
            var embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription("Command: " + (index + 1) + " / " + commandList.commandsList.length)
            .setThumbnail(member.user.avatarURL)
            .setFooter("Requested by " + message.author.username)
            .setColor(getRandomColor())
            .addField("*Command*: " + config.config.prefix + commandList.commandsList[index].command,
            "**Alias**: " + commandList.commandsList[index].alias + "\n" + 
            "**Description**: " + commandList.commandsList[index].description + "\n"+
            "**Format**: " + commandList.commandsList[index].format, true)
            .addField("Type:",config.config.prefix + "help " + (index + 1) + " for next help page");;

            message.channel.send({embed});
        }

    }
    else{
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("Command: 1 / " + commandList.commandsList.length)
        .setColor(getRandomColor())
        .setThumbnail(member.user.avatarURL)
        .addField("**Command**: " + config.config.prefix + commandList.commandsList[0].command,
        "**Alias**: " + commandList.commandsList[0].alias + "\n" + 
        "**Description**: " + commandList.commandsList[0].description + "\n"+
        "**Format**: " + commandList.commandsList[0].format, true)
        .addField("Type:",config.config.prefix + "help 2 for next help page");
        message.channel.send({embed});
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}