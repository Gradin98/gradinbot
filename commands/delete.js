const Discord = require('discord.js');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[11].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[11].alias.length; i++){
                if(arg[0] == commandList.commandsList[11].command || arg[0] == commandList.commandsList[11].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[11].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

//TODO: verificare daca e mai vechi de 2 saptamani si adaugare permisie
function contentCommand(message, arg){
    if(arg[1] != null){
        var messagecount = parseInt(arg[1]) + 1;
        var numar = messagecount;
        if(messagecount >= 99){
            while(numar >= 0){
                if(numar > 98){
                    message.channel.fetchMessages({limit: 98}).then(messages => message.channel.bulkDelete(messages));
                }
                else{
                    message.channel.fetchMessages({limit: numar}).then(messages => message.channel.bulkDelete(messages));
                }
                numar -= 99;
            }
        }else{
            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        }
    
        message.channel.send("```Se proceseaza stergerea celor " + messagecount + " mesaje```");
    }
}