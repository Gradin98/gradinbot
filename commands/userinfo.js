const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[5].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[5].alias.length; i++){
                if(arg[0] == commandList.commandsList[5].command || arg[0] == commandList.commandsList[5].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[5].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    if(arg[1] != null && arg[1].startsWith("<@")){
        var id = "";
        if(arg[1].startsWith("<@!")){
            id = arg[1].substring(3,arg[1].length - 1);
        }
        else{
            id = arg[1].substring(2,arg[1].length - 1);
        }
        var member = message.guild.members.find("id",id);
        var firstDate = member.user.createdAt;
        var oneDay = 24*60*60*1000;
        var secondDate = new Date();
        var thirdDate = member.joinedAt;
        var diffDaysdisc = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        var diffDaysSv = Math.round(Math.abs((secondDate.getTime() - thirdDate.getTime())/(oneDay)));
        var arrayrole = member.roles.array();
        var stringarray = "";
        var game = "";

        if(member.user.presence.game != null){
            game = member.user.presence.game.name;
        }
        else{
            game = " - ";
        }

        for(var i = 1; i < arrayrole.length; i++){
            stringarray += arrayrole[i] + " ";
        }
        
        if(stringarray == ""){
            stringarray = " - ";
        }

        var embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setColor(getRandomColor())
        .setDescription("Membru pe server de " + diffDaysSv +" zile\nMembru pe discord de " +  diffDaysdisc + " zile")
        .setFooter("Requested by " + message.author.username)
        .setThumbnail(member.user.avatarURL)
        .addField("Roles:",stringarray, true)
        .addField("Channel:", message.channel.name, true)
        .addField("Status :", member.user.presence.status, true)
        .addField("Playing :", game, true);

        message.channel.send({embed});
    }
    else{
        var firstDate = message.author.createdAt;
        var oneDay = 24*60*60*1000;
        var secondDate = new Date();
        var thirdDate = message.member.joinedAt;
        var diffDaysdisc = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        var diffDaysSv = Math.round(Math.abs((secondDate.getTime() - thirdDate.getTime())/(oneDay)));
        var arrayrole = message.member.roles.array();
        var stringarray = "";
        var game = "";

        if(message.member.user.presence.game != null){
            game = message.member.user.presence.game.name;
        }
        else{
            game = " - ";
        }

        for(var i = 1; i < arrayrole.length; i++){
            stringarray += arrayrole[i] + " ";
        }
        
        if(stringarray == ""){
            stringarray = " - ";
        }

        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(getRandomColor())
        .setDescription("Membru pe server de " + diffDaysSv +" zile\nMembru pe discord de " +  diffDaysdisc + " zile")
        .setFooter("Requested by " + message.author.username)
        .setThumbnail(message.author.avatarURL)
        .addField("Roles:",stringarray, true)
        .addField("Channel:", message.channel.name, true)
        .addField("Status :", message.member.presence.status, true)
        .addField("Playing :", game, true);

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