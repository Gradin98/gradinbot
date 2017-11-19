const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');
const google = require('google');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[3].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[3].alias.length; i++){
                if(arg[0] == commandList.commandsList[3].command || arg[0] == commandList.commandsList[3].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[3].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    if(arg.length > 1){
        var data = "";
        for(var i = 1; i < arg.length; i++){
            data += arg[i] + " ";
        }
        google(data, function (err, res){
            console.log("am ajuns si aici");
            var embed = new Discord.RichEmbed()
                .setFooter("Requested by " + message.author.username)
                .setColor(getRandomColor());
                
            var index = 0;
            res.links.forEach(function(link) { if(link.href!=null){
                index++;
                if(index > 1){
                    return;
                }
                embed.addField(link.title,link.href + "\n\n" + link.description);
            }});
            message.channel.send({embed});
        })
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