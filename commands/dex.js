const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');
const google = require('google');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[7].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[7].alias.length; i++){
                if(arg[0] == commandList.commandsList[7].command || arg[0] == commandList.commandsList[7].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[7].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    if(arg[1] != null){
        request({
            url: 'https://dexonline.ro/definitie/' + arg[1] + '?format=json'
        }, (error, response, body) => {
            if(error) return;
            
            var data = JSON.parse(body);

            if(data.definitions.length > 0){
                var string;
                var index;
                if(arg[2] != null && parseInt(arg[2]) < data.definitions.length){
                    string = data.definitions[parseInt(arg[2])].internalRep;
                    index = parseInt(arg[2]);
                } else {
                    string = data.definitions[0].internalRep;
                    index = 0;
                }
                string = string.replace(/#|$|@/g, "");
                if(string.length > 1000){
                    string = string.substring(0,1000) + "...";
                }
                var embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(getRandomColor())
                .setTimestamp()
                .setFooter("Requested by " + message.author.username)
                .addField("Source: " + data.definitions[index].sourceName,string, true);
                
                message.channel.send({embed});
            }
            else{
                message.channel.send("Nu avem acest cuvant in baza de date!");
            }
        });
    }
    else{
        message.channel.send("Format comanda: !!dex <cuvant>");
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