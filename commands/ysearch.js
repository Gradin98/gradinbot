const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');
const search = require('youtube-search');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[6].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[6].alias.length; i++){
                if(arg[0] == commandList.commandsList[6].command || arg[0] == commandList.commandsList[6].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[6].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

const opts = {
	maxResults: 1,
	key: config.config.youtube
};

function contentCommand(message, arg){
    var stringdata = "";
    if (arg.length > 1){
        for(var i = 1; i < arg.length; i++){
            stringdata += (arg[i] + " ");
        }
    }
    else{
        message.channel.send("Structura comenzii este !!yseach <cautare>");
        return;
    }
    search(stringdata, opts, function(err, results) {
            if(err) return console.log(err);
            
            //console.log(results);
            link = results[0].link;
            message.channel.send(link);
    });
}