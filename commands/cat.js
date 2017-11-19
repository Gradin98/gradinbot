const Discord = require('discord.js');
const config = require('../config.js');
const commandList = require('./commandList.js');
const animals = require('relevant-animals');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[3].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[8].alias.length; i++){
                if(arg[0] == commandList.commandsList[8].command || arg[0] == commandList.commandsList[8].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[8].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    animals.cat().then(s => message.channel.send(s));
}