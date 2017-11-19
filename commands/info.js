const Discord = require('discord.js');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[10].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[10].alias.length; i++){
                if(arg[0] == commandList.commandsList[10].command || arg[0] == commandList.commandsList[10].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[10].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    message.channel.send({embed: {
        color: getRandomColor(),
        author: {
            name: message.author.name,
            icon_url: message.author.avatarURL
          },
        title: "Gradin bot info",
        url: "http://kocsislorand.com",
        description: "Bot facut de plictiseala, are comenzi de administrare dar si cateva useless",
        fields: [{
            name: "Site:",
            value: "kocsislorand.com"
        }],
        footer: {
          text: "Requested by " + message.author.username
        }
      }
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }